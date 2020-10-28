import React from 'react';
import { PortalProvider } from './PortalProvider';

export class PortalUpdater {
  element: React.ReactNode;
  private readonly _portalProvider: PortalProvider;

  constructor(element: React.ReactNode, portalProvider: PortalProvider) {
    this.element = element;
    this._portalProvider = portalProvider;
  }

  update(element: React.ReactNode) {
    this.element = element;
    this._portalProvider.update();
  }

  remove() {
    this._portalProvider.remove(this);
  }
}
