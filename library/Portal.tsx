import * as React from 'react';
import { PortalStoreContext } from './PortalStoreContext';
export type PortalProps = {
  namespace?: string;
  children: React.ReactNode;
};

export const Portal: React.FC<PortalProps> = ({ namespace, children }) => {
  const store = React.useContext(PortalStoreContext);

  if (store == null) throw new Error('Portal 外层必须存在 PortalProvider');

  const portalKeyRef = React.useRef<string>();
  const updater = store!.getUpdater(namespace);

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
