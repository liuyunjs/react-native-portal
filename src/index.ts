export { PortalProvider } from './PortalProvider';
export { Portal } from './Portal';
import PortalStore from './PortalStore';

export const getUpdater = (namespace: string) => PortalStore.getUpdater(namespace);
