import * as React from 'react';
import { PortalStore } from './PortalStore';
import { PortalStoreContext } from './PortalStoreContext';

export type PortalProps = {
  namespace?: string;
  children?: React.ReactNode;
} & (
  | {
      useContextStore: false;
      store: PortalStore;
    }
  | {
      useContextStore?: true;
      store: undefined;
    }
);

export const Portal: React.FC<PortalProps> = ({
  namespace,
  children,
  useContextStore,
  store: storeProp,
}) => {
  const storeContext = React.useContext(PortalStoreContext);

  let store: PortalStore;
  if (useContextStore) {
    if (storeContext == null) {
      throw new Error('Portal 外层必须存在 PortalProvider');
    }
    store = storeContext!;
  } else {
    if (storeProp == null) {
      throw new Error('"useContextStore" 为 false 时，"store" prop 必传');
    }
    store = storeProp!;
  }

  // if (store == null) throw new Error('Portal 外层必须存在 PortalProvider');

  const portalKeyRef = React.useRef<string>();
  const updater = store.getUpdater(namespace);

  const remove = () => {
    if (portalKeyRef.current) {
      updater.remove(portalKeyRef.current);

      portalKeyRef.current = undefined;
    }
  };

  React.useLayoutEffect(() => {
    const childrenLength = React.Children.toArray(children).length;

    if (childrenLength) {
      const child =
        childrenLength > 1 || Object(children) !== children ? (
          <>{children}</>
        ) : (
          children
        );
      if (portalKeyRef.current) {
        updater.update(portalKeyRef.current, child as React.ReactElement);
      } else {
        portalKeyRef.current = updater.add(child as React.ReactElement);
      }
    } else {
      remove();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useLayoutEffect(() => remove, []);

  return null;
};
