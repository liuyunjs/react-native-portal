import PortalStore from './PortalStore';
export * from './useRootTag';
export * from './createPortal';

export { PortalProvider } from './PortalProvider';
export { Portal } from './Portal';

export const getUpdater = (namespace: string) => PortalStore.getUpdater(namespace);
export { PortalStore };
