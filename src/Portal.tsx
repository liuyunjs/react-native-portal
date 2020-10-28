import * as React from 'react';
import { PortalUpdater } from './PortalUpdater';
import { PortalQueue } from './PortalQueue';

export class Portal extends React.PureComponent {
  private _portals: PortalUpdater[] = [];

  componentDidMount() {
    this._portals = PortalQueue.add(this.props.children);
  }

  componentDidUpdate(prevProps: Readonly<{ children: any }>) {
    const { children } = this.props;
    if (children !== prevProps.children) {
      this._portals.forEach(portal => portal.update(children));
    }
  }

  componentWillUnmount() {
    this._portals.forEach(portal => portal.remove());
  }

  render() {
    return null;
  }
}
