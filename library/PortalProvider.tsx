import React from 'react';
import { PortalPatcher } from './PortalPatcher';
import { PortalStore } from './PortalStore';

export const PortalProvider: React.FC<{ store?: PortalStore }> = ({
  children,
  store,
}) => {
  return (
    <>
      {children}
      <PortalPatcher store={store!} />
    </>
  );
};
