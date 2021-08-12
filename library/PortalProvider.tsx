import React from 'react';
import { PortalPatcher } from './PortalPatcher';
import DefaultStore, { PortalStore } from './PortalStore';

export const PortalProvider: React.FC<{ store?: PortalStore }> = ({
  children,
  store = DefaultStore,
}) => {
  return (
    <>
      {children}
      <PortalPatcher store={store} />
    </>
  );
};
