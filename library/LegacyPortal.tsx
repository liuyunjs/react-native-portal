import React from 'react';
import PortalStore from './PortalStore';

export type LegacyPortalProps = {
  namespace?: string;
  children: React.ReactElement;
  override?: { current?: string };
};

export const LegacyPortal: React.FC<LegacyPortalProps> = ({
  namespace = '',
  override,
  children,
}) => {
  const overrideCurr = override?.current;
  const portalKeyRef = React.useRef(overrideCurr);
  const updater = PortalStore.getUpdater(namespace);

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
  }, [children]);

  React.useLayoutEffect(() => remove, []);

  return null;
};
