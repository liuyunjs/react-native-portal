import { PortalStore, DefaultStore } from './PortalStore';
import { Portal } from './Portal';
import { PortalProvider } from './PortalProvider';
import { autoInjectProvider } from './autoInjectProvider';

export {
  PortalStore,
  DefaultStore,
  Portal,
  PortalProvider,
  autoInjectProvider,
};

autoInjectProvider();

PortalProvider.defaultProps = Portal.defaultProps = {
  store: DefaultStore,
};
