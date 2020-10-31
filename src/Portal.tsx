import * as React from 'react';
import { PortalUpdater } from './PortalUpdater';
import { PortalQueue } from './PortalQueue';
import { PortalContainer, PortalContainerProps } from './PortalContainer';

export class Portal extends React.PureComponent<PortalContainerProps> {
  private _portals: PortalUpdater[] = [];

  componentDidMount() {
    this._portals = PortalQueue.add(this._getElement());
  }

  componentDidUpdate(prevProps: Readonly<PortalContainerProps & { children: React.ReactNode }>) {
    const { children } = this.props;
    if (children !== prevProps.children) {
      this._portals.forEach(portal => portal.update(this._getElement()));
    }
  }

  componentWillUnmount() {
    this._portals.forEach(portal => portal.remove());
  }

  private _getElement() {
    const { children, ...restProps } = this.props;
    return <PortalContainer {...restProps}>{children}</PortalContainer>;
  }

  render() {
    return null;
  }
}
