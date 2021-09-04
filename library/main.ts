import PortalStore from './PortalStore';
export * from './Portal';

export { PortalProvider } from './PortalProvider';
export * from './Portal';

export const getUpdater = (namespace?: string) =>
  PortalStore.getUpdater(namespace);
export { PortalStore };
