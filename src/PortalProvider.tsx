import * as React from 'react';
import { PortalUpdater } from './PortalUpdater';
import { PortalQueue } from './PortalQueue';

type PortalProviderProps = {
  maybeActive: () => boolean;
};

type PortalProviderState = {
  portals: PortalUpdater[];
};

export class PortalProvider extends React.PureComponent<PortalProviderProps, PortalProviderState> {
  static defaultProps = {
    maybeActive: () => true,
  };

  state: PortalProviderState = {
    portals: [],
  };

  componentDidMount() {
    PortalQueue.push(this);
  }

  componentWillUnmount() {
    PortalQueue.pop(this);
  }

  add(element: React.ReactNode) {
    const portalElement = new PortalUpdater(element, this);
    this.setState(state => ({ portals: state.portals.concat(portalElement) }));
    return portalElement;
  }

  update() {
    this.setState(state => ({
      portals: state.portals.slice(),
    }));
  }

  remove(portalElement: PortalUpdater) {
    this.setState(state => ({
      portals: state.portals.filter(item => item !== portalElement),
    }));
  }

  render() {
    return this.state.portals.map((item, index) => {
      if (!item.element) {
        return null;
      }
      // @ts-ignore
      return React.cloneElement(item.element, { key: index });
    });
  }
}
