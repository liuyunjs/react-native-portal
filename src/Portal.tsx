import React from 'react';
import useUpdateEffect from 'react-use/esm/useUpdateEffect';
import PortalStore from './PortalStore';

export const Portal = ({
  children,
  namespace,
}: {
  children: React.ReactNode;
  namespace: string;
}) => {
  const portalKeyRef = React.useRef<string>();

  const updater = PortalStore.getUpdater(namespace);

  React.useEffect(() => {
    portalKeyRef.current = updater.add(children as React.ReactElement);

    return () => {
      updater.remove(portalKeyRef.current!);
    };
    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updater]);

  useUpdateEffect(() => {
    updater.update(portalKeyRef.current!, children as React.ReactElement);
  }, [children]);

  return null;
};
