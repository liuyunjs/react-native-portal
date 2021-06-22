import React from 'react';
import PortalStore from './PortalStore';

type PortalElement = {
  key: string;
  element: React.ReactElement;
};

export class PortalUpdater {
  private _container?: React.ComponentType<any> | React.ReactElement;
  private _portals: PortalElement[] = [];
  private _forceUpdate: React.Dispatch<React.SetStateAction<never[]>> | null = null;

  init(forceUpdate: React.Dispatch<React.SetStateAction<never[]>>) {
    this._forceUpdate = forceUpdate;
  }

  setContainer(componentOrElement: React.ComponentType<any> | React.ReactElement) {
    this._container = componentOrElement;
  }

  add(element: React.ReactElement) {
    const portalKey = Math.random().toString(32).slice(2);
    this._portals.push({
      key: portalKey,
      element,
    });
    if (!this._forceUpdate) {
      PortalStore.forceUpdate();
    } else {
      this._forceUpdate!([]);
    }

    return portalKey;
  }

  update(key: string, element: React.ReactElement) {
    this._portals = this._portals.map(portalElement => {
      if (portalElement.key === key) return { key, element };
      return portalElement;
    });
    this._forceUpdate!([]);
  }

  remove(key: string) {
    this._portals = this._portals.filter(portalElement => portalElement.key !== key);
    this._forceUpdate!([]);
  }

  render(): React.ReactElement {
    const elements = this._portals.map(portal =>
      React.cloneElement(portal.element, { key: portal.key }),
    );
    if (!this._container) {
      return (elements as unknown) as React.ReactElement;
    }
    if (React.isValidElement(this._container)) {
      return React.cloneElement(this._container, {}, elements);
    }
    return React.createElement(this._container, null, elements);
  }
}
