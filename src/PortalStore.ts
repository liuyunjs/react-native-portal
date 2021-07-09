import React from 'react';
import { AppRegistry } from 'react-native';
import { PortalUpdater } from './PortalUpdater';
import { PortalProvider } from './PortalProvider';
import { setDefaultFabric } from './createPortal';

class PortalStore {
  private readonly _store = new Map<string, PortalUpdater>();
  private _forceUpdate: React.Dispatch<React.SetStateAction<never[]>> | null = null;

  constructor() {
    // @ts-ignore
    AppRegistry.setWrapperComponentProvider((params: { fabric?: boolean }) => {
      setDefaultFabric(params.fabric === true);
      return PortalProvider;
    });
  }

  init(forceUpdate: React.Dispatch<React.SetStateAction<never[]>>) {
    this._forceUpdate = forceUpdate;
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
