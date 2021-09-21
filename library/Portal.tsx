import React from 'react';
import DefaultStore, { PortalStore } from './PortalStore';

export type PortalProps = {
  namespace?: string;
  children: React.ReactElement;
  override?: { current?: string };
  store?: PortalStore;
};

export const Portal: React.FC<PortalProps> = ({
  namespace,
  override,
  children,
  store,
}) => {
  const overrideCurr = override?.current;
  const portalKeyRef = React.useRef(overrideCurr);
  const updater = store!.getUpdater(namespace);

  const remove = () => {
    if (portalKeyRef.current) {
      updater.remove(portalKeyRef.current);

      if (overrideCurr && overrideCurr === portalKeyRef.current) {
        override!.current = undefined;
      }
      portalKeyRef.current = undefined;
    }
  };

  React.useLayoutEffect(() => {
    if (React.Children.toArray(children).length) {
      if (portalKeyRef.current) {
        updater.update(portalKeyRef.current, children);
      } else {
        portalKeyRef.current = updater.add(children);
        if (override) {
          override.current = portalKeyRef.current;
        }
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

Portal.defaultProps = {
  store: DefaultStore,
  namespace: '',
};