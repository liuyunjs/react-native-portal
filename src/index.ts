import PortalStore from './PortalStore';
export * from './useRootTag';
export * from './createPortal';
export * from './LegacyPortal';

export { PortalProvider } from './PortalProvider';
export * from './Portal';

export const getUpdater = (namespace: string) => PortalStore.getUpdater(namespace);
export { PortalStore };
