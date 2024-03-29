import * as React from 'react';
import { PortalStore } from './PortalStore';

export class PortalUpdater {
  private _container?: React.ComponentType<any> | React.ReactElement;
  private _portals: React.ReactElement[] = [];
  private _forceUpdate: React.Dispatch<React.SetStateAction<never[]>> | null =
    null;

  constructor(private readonly _store: PortalStore) {}

  private _wrap(key: string, element: React.ReactElement) {
    return React.cloneElement(element, {
      onRequestClose: element.props.onRequestClose || (() => this.remove(key)),
      portalKey: key,
      key,
    });
  }

  init(forceUpdate: React.Dispatch<React.SetStateAction<never[]>>) {
    this._forceUpdate = forceUpdate;
  }

  setContainer(
    componentOrElement: React.ComponentType<any> | React.ReactElement,
  ) {
    this._container = componentOrElement;
  }

  add(element: React.ReactElement) {
    const portalKey = Math.random().toString(32).slice(2);
    this._portals.push(this._wrap(portalKey, element));
    if (!this._forceUpdate) {
      this._store.forceUpdate();
    } else {
      this._forceUpdate!([]);
    }

    return portalKey;
  }

  update(key: string, element: React.ReactElement) {
    this._portals = this._portals.map((portalElement) => {
      if (portalElement.key === key) return this._wrap(key, element);
      return portalElement;
    });
    this._forceUpdate!([]);
  }

  remove(key: string) {
    this._portals = this._portals.filter(
      (portalElement) => portalElement.key !== key,
    );
    this._forceUpdate!([]);
  }

  render(): React.ReactElement | null {
    const elements = this._portals;
    if (!this._container) {
      return elements as unknown as React.ReactElement;
    }
    if (React.isValidElement(this._container)) {
      return React.cloneElement(this._container, {}, elements);
    }
    return React.createElement(this._container, null, elements);
  }
}
