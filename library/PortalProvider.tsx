import * as React from 'react';
import { PortalPatcher } from './PortalPatcher';
import { DefaultStore, PortalStore } from './PortalStore';
import { PortalStoreContext } from './PortalStoreContext';

export const PortalProvider: React.FC<{
  store?: PortalStore;
}> = ({ children, store }) => {
  return (
    <PortalStoreContext.Provider value={store!}>
      {children}
      <PortalPatcher store={store!} />
    </PortalStoreContext.Provider>
  );
};

PortalProvider.defaultProps = {
  store: DefaultStore,
};
