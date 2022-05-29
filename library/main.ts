import { PortalStore, DefaultStore } from './PortalStore';
import { Portal } from './Portal';
import { PortalProvider } from './PortalProvider';
import { autoInjectProvider } from './autoInjectProvider';
import { PortalStoreContext } from './PortalStoreContext';

export {
  PortalStore,
  DefaultStore,
  Portal,
  PortalProvider,
  autoInjectProvider,
  PortalStoreContext,
};

autoInjectProvider();
