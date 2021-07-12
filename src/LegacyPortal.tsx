import React from 'react';
import PortalStore from './PortalStore';

export type LegacyPortalProps = {
  namespace: string;
  children: React.ReactElement;
  override?: { current?: string };
};

export const LegacyPortal: React.FC<LegacyPortalProps> = function LegacyPortal({
  namespace,
  override,
  children,
}) {
  const portalKeyRef = React.useRef(override?.current);
  const updater = PortalStore.getUpdater(namespace);

  React.useLayoutEffect(() => {
    if (portalKeyRef.current) {
      updater.update(portalKeyRef.current, children);
    } else {
      portalKeyRef.current = updater.add(children);
      if (override) {
        override.current = portalKeyRef.current;
      }
    }
  }, [children]);

  React.useLayoutEffect(
    () => () => {
      if (portalKeyRef.current) {
        updater.remove(portalKeyRef.current);

        if (override?.current && override.current === portalKeyRef.current) {
          override.current = undefined;
        }
      }
    },
    [],
  );

  return null;
};
