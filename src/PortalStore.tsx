import React from 'react';
import { AppRegistry } from 'react-native';
import { PortalUpdater } from './PortalUpdater';
import { PortalProvider } from './PortalProvider';
import { setDefaultFabric } from './createPortal';

class PortalStore {
  private readonly _store = new Map<string, PortalUpdater>();
  private _forceUpdate: React.Dispatch<React.SetStateAction<never[]>> | null = null;
  private _container?: React.ComponentType<any> | React.ReactElement;

  constructor() {
    // @ts-ignore
    AppRegistry.setWrapperComponentProvider((params: { fabric?: boolean }) => {
      setDefaultFabric(params.fabric === true);

      if (!this._container) return PortalProvider;

      const PortalWrapper = (props: any) => {
        if (React.isValidElement(this._container)) {
        }
      };
    });
  }

  init(forceUpdate: React.Dispatch<React.SetStateAction<never[]>>) {
    this._forceUpdate = forceUpdate;
  }

  setContainer(container: React.ComponentType<any> | React.ReactElement) {
    this._container = container;
  }

  forceUpdate() {
    if (!this._forceUpdate) {
      throw new Error('PortalProvider not found');
    }
    this._forceUpdate([]);
  }

  getUpdater(namespace: string) {
    if (this._store.has(namespace)) return this._store.get(namespace)!;
    const updater = new PortalUpdater();
    this._store.set(namespace, updater);
    return updater;
  }

  forEach(callback: (updater: PortalUpdater, namespace: string) => void) {
    this._store.forEach(callback);
  }
}

export default new PortalStore();
