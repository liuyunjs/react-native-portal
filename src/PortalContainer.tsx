import * as React from 'react';

export type PortalContainerProps = {
  onMount?: () => void;
  onDestroy?: () => void;
};

export class PortalContainer extends React.Component<PortalContainerProps> {
  componentWillUnmount() {
    this.props.onDestroy?.();
  }

  componentDidMount() {
    this.props.onMount?.();
  }

  render() {
    return this.props.children;
  }
}
