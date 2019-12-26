/**
 * @Description : portal
 * @Create on : 2019/12/17 23:08
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import useGetSetState from 'react-use/lib/useGetSetState';

export type PortalItem = {
  id: number;
  element: React.ReactElement;
};

export type PortalState = {
  list: PortalItem[];
};

export type PortalProviderProps = {
  children?: React.ReactElement | React.ReactElement[] | null;
};

export type PortalProps = {
  children: React.ReactElement;
};

export interface PortalHandle {
  (): void;
  update: (element: React.ReactElement) => void;
}

export type ContextValue = {
  update: (portalId: number, element: React.ReactElement) => void;
  create: (element: React.ReactElement) => PortalHandle;
  destroy: (portalId: number) => void;
  destroyAll: () => void;
  pop: () => void;
  shift: () => void;
};

export type PortalProperty = ContextValue & {
  Provider: React.MemoExoticComponent<React.FC<PortalProviderProps>>;
  usePortalContext: () => ContextValue;
  usePortalUpdate: () => (
    portalId: number,
    element: React.ReactElement,
  ) => void;
  usePortalDestroy: () => (portalId: number) => void;
  usePortalDestroyAll: () => () => void;
  usePortalCreate: () => (element: React.ReactElement) => PortalHandle;
  usePortalElement: (
    props: PortalProps,
  ) => React.MutableRefObject<PortalHandle | undefined>;

  Context: React.Context<ContextValue>;

  Portal: React.MemoExoticComponent<
    React.ForwardRefExoticComponent<PortalProps>
  >;

  HOC: <T extends any>(
    Component: React.ComponentType<T>,
  ) => React.MemoExoticComponent<
    React.ForwardRefExoticComponent<React.PropsWithoutRef<T & PortalRefProps>>
  >;
};

type PortalRefProps = {
  portalRef: React.MutableRefObject<any>;
};

export default function() {
  let id = 0;
  let set: (state: PortalState) => any;
  let get: () => PortalState;

  function destroy(portalId: number) {
    if (!portalId) {
      return;
    }
    set({
      list: get().list.filter(item => item.id !== portalId),
    });
  }

  function update(portalId: number, element: React.ReactElement) {
    set({
      list: get().list.map(item => {
        if (item.id === portalId) {
          return {
            id: portalId,
            element,
          };
        }
        return item;
      }),
    });
  }

  function destroyAll() {
    set({list: []});
  }

  function create(element: React.ReactElement): PortalHandle {
    id++;
    set({
      list: get().list.concat({
        id,
        element,
      }),
    });

    const handle: PortalHandle = () => destroy(id);

    handle.update = (element: React.ReactElement) => {
      update(id, element);
    };

    return handle;
  }

  function pop() {
    const {list} = get();
    set({list: list.slice(0, list.length - 1)});
  }

  function shift() {
    set({list: get().list.slice(1)});
  }

  const contextValue: ContextValue = {
    update,
    create,
    destroy,
    destroyAll,
    pop,
    shift,
  };

  const Context = React.createContext<ContextValue>(contextValue);

  const usePortalContext = () => React.useContext(Context);

  const usePortalCreate = () => usePortalContext().create;

  const usePortalDestroy = () => usePortalContext().destroy;

  const usePortalDestroyAll = () => usePortalContext().destroyAll;

  const usePortalUpdate = () => usePortalContext().update;

  const usePortalElement = ({children}: PortalProps) => {
    const portalRef = React.useRef<PortalHandle>();

    React.useEffect(() => {
      portalRef.current && portalRef.current.update(children);
    }, [children]);

    React.useEffect(() => {
      portalRef.current = create(children);
      return portalRef.current;
    }, []);

    return portalRef;
  };

  const Provider = React.memo(({children}: PortalProviderProps) => {
    const [getState, setState] = useGetSetState<PortalState>({list: []});

    get = getState;
    set = setState;

    // console.log('portal updated, current portal list: ', get().list);

    return (
      <Context.Provider value={contextValue}>
        {children}
        {get().list.map(item =>
          React.cloneElement(item.element, {key: item.id}),
        )}
      </Context.Provider>
    );
  });

  const Portal = React.memo(
    React.forwardRef(({children}: PortalProps, ref) => {
      const portalRef = usePortalElement({children});

      React.useImperativeHandle(
        ref,
        () => {
          return {
            update(element: React.ReactElement) {
              portalRef.current && portalRef.current.update(element);
            },
            destroy() {
              portalRef.current && portalRef.current();
            },
          };
        },
        [],
      );

      return null;
    }),
  );

  const HOC = <T extends any>(
    Component: React.ComponentType<T>,
  ): React.MemoExoticComponent<React.ForwardRefExoticComponent<
    React.PropsWithoutRef<T & PortalRefProps>
  >> => {
    return React.memo(
      React.forwardRef(({portalRef, ...props}: T & PortalRefProps, ref) => {
        return (
          <Portal ref={portalRef}>
            <Component {...(props as T)} ref={ref} />
          </Portal>
        );
      }),
    );
  };

  const portal: PortalProperty = {
    ...contextValue,
    Provider,
    usePortalContext,
    usePortalCreate,
    usePortalDestroy,
    usePortalDestroyAll,
    usePortalUpdate,
    usePortalElement,
    Context,
    Portal,
    HOC,
  };

  return portal;
}
