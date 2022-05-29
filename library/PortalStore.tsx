import * as React from 'react';
import { PortalUpdater } from './PortalUpdater';

export class PortalStore {
  private readonly _store = new Map<string, PortalUpdater>();
  private _forceUpdate: React.Dispatch<React.SetStateAction<never[]>> | null =
    null;

  init(forceUpdate: React.Dispatch<React.SetStateAction<never[]>>) {
    this._forceUpdate = forceUpdate;
  }

  forceUpdate() {
    if (!this._forceUpdate) {
      throw new Error('PortalProvider not found');
    }
    this._forceUpdate([]);
  }

  getUpdater(namespace: string = '') {
    if (this._store.has(namespace)) return this._store.get(namespace)!;
    const updater = new PortalUpdater(this);
    this._store.set(namespace, updater);
    return updater;
  }

  forEach(callback: (updater: PortalUpdater, namespace: string) => void) {
    this._store.forEach(callback);
  }
}

export const DefaultStore = new PortalStore();
