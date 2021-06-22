import React from 'react';
import { PortalUpdater } from './PortalUpdater';

class PortalStore {
  private readonly _store: Record<string, PortalUpdater> = {};
  private _forceUpdate: React.Dispatch<React.SetStateAction<never[]>> | null = null;

  init(forceUpdate: React.Dispatch<React.SetStateAction<never[]>>) {
    this._forceUpdate = forceUpdate;
  }

  forceUpdate() {
    this._forceUpdate?.([]);
  }

  setContainer(namespace: string, componentOrElement: React.ComponentType<any> | React.ReactElement) {
    this.getUpdater(namespace).setContainer(componentOrElement);
  }

  getUpdater(namespace: string) {
    if (!this._forceUpdate) {
      throw new Error('PortalProvider not found');
    }

    const cachedUpdater = this._store[namespace];
    if (cachedUpdater) return cachedUpdater;
    const updater = new PortalUpdater();
    this._store[namespace] = updater;
    return updater;
  }

  forEach(callback: (updater: PortalUpdater, namespace: string) => void) {
    Object.keys(this._store).forEach(namespace => {
      callback(this._store[namespace], namespace);
    });
  }
}

export default new PortalStore();
