import * as React from 'react';
import useGetSetState from 'react-use/lib/useGetSetState';
import invariant from 'invariant';

export type PortalItem = {
  id: number;
  element: React.ReactElement;
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
  id: number;
  element: React.ReactElement;
}

export type PortalProviderState = {
  [key: string]: PortalItem[];
};

export const createPortalProvider = () => {
  let providerId = 0;
  let providerSetState: (patch: Partial<PortalProviderState>) => void;
  let providerGetState: () => PortalProviderState;

  const createPortal = () => {
    const portalKey = `${++providerId}`;
    let id = 0;

    /**
     * 获取 portal 列表
     */
    const getState = (): PortalItem[] => {
      // 验证组件树外层是否有 PortalProvider；
      invariant(!!providerGetState, '请在当前组件外层使用 PortalProvider 组件包装');

      return providerGetState()[portalKey] || [];
    };

    const setState = (list: PortalItem[]) => {
      // 验证组件树外层是否有 PortalProvider；
      invariant(!!providerSetState, '请在当前组件外层使用 PortalProvider 组件包装');

      providerSetState({
        ...providerGetState(),
        [portalKey]: list,
      });
    };

    const destroy = (portalId: number) => {
      if (!portalId) {
        return;
      }
      setState(getState().filter(item => item.id !== portalId));
    };

    const update = (portalId: number, element: React.ReactElement) => {
      setState(
        getState().map(item => {
          if (item.id === portalId) {
            return {
              id: portalId,
              element,
            };
          }
          return item;
        }),
      );
    };

    const destroyAll = () => {
      setState([]);
    };

    const create = (element: React.ReactElement): PortalHandle => {
      id++;
      setState(
        getState().concat([
          {
            id,
            element,
          },
        ]),
      );

      const handle: PortalHandle = () => destroy(id);

      handle.update = (element: React.ReactElement) => {
        update(id, element);
      };

      handle.id = id;
      handle.element = element;

      return handle;
    };

    const pop = () => {
      const list = getState();
      setState(list.slice(0, list.length - 1));
    };

    const shift = () => {
      setState(getState().slice(1));
    };

    const usePortalElement = ({ children }: PortalProps) => {
      const portalRef = React.useRef<PortalHandle>();

      React.useEffect(() => {
        portalRef.current && portalRef.current.update(children);
      }, [children]);

      React.useEffect(() => {
        portalRef.current = create(children);
        return () => {
          portalRef.current && portalRef.current();
          portalRef.current = undefined;
        };
      }, []);

      return portalRef;
    };

    const Portal = React.forwardRef(({ children }: PortalProps, ref) => {
      const portalRef = usePortalElement({ children });

      React.useImperativeHandle(
        ref,
        () => {
          return {
            update(element: React.ReactElement) {
              portalRef.current && portalRef.current.update(element);
            },
            destroy() {
              portalRef.current && portalRef.current();
              portalRef.current = undefined;
            },
          };
        },
        [],
      );

      return null;
    });

    const HOC = <T extends any>(
      Component: React.ComponentType<T>,
    ): React.MemoExoticComponent<React.ForwardRefExoticComponent<React.PropsWithoutRef<T>>> => {
      return React.memo(
        React.forwardRef((props: T, ref) => {
          usePortalElement({
            children: <Component {...props} ref={ref} />,
          });

          return null;
        }),
      );
    };

    return {
      create,
      update,
      pop,
      shift,
      destroy,
      destroyAll,
      usePortalElement,
      HOC,
      Portal: React.memo(Portal),
    };
  };

  const Provider = ({ children }: PortalProviderProps) => {
    const [getState, setState] = useGetSetState<PortalProviderState>();

    providerGetState = getState;
    providerSetState = setState;
    const state = getState();

    return (
      <>
        {children}
        {Object.keys(state).map(portalKey =>
          state[portalKey].map(portal =>
            React.cloneElement(portal.element, {
              key: `${portalKey}_${portal.id}`,
            }),
          ),
        )}
      </>
    );
  };

  return {
    Provider: React.memo(Provider),
    createPortal,
    portal: createPortal(),
  };
};

const { Provider, createPortal, portal } = createPortalProvider();
const { Portal, create, update, pop, shift, destroy, destroyAll, usePortalElement, HOC } = portal;

export {
  Provider as PortalProvider,
  createPortal,
  Portal,
  create,
  update,
  pop,
  shift,
  destroy,
  destroyAll,
  usePortalElement,
  HOC,
};
