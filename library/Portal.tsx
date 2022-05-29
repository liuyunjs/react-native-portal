import * as React from 'react';
import { PortalStore } from './PortalStore';

export type PortalProps = {
  namespace?: string;
  children: React.ReactNode;
  store?: PortalStore;
};

export const Portal: React.FC<PortalProps> = ({
  namespace,
  children,
  store,
}) => {
  const portalKeyRef = React.useRef<string>();
  const updater = store!.getUpdater(namespace);

  const remove = () => {
    if (portalKeyRef.current) {
      updater.remove(portalKeyRef.current);

      portalKeyRef.current = undefined;
    }
  };

  React.useLayoutEffect(() => {
    if (React.Children.toArray(children).length) {
      if (portalKeyRef.current) {
        updater.update(portalKeyRef.current, children as React.ReactElement);
      } else {
        portalKeyRef.current = updater.add(children as React.ReactElement);
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
