/**
 * @Description : create portal component
 * @Create on : 2019/11/18 22:54
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import {ComponentType} from 'react';
import hoistStatics from 'hoist-non-react-statics'
import StaticAction from './static';
import {PortalProps} from './types';

export default function portalHOC<T extends {}>(Component: ComponentType<T>) {
  const staticAction = new StaticAction();

  class Portal extends React.PureComponent<PortalProps & T> {
    portalKey?: string;

    static WrappedComponent = Component;
    static displayName = Component.displayName || Component.name || 'Component';

    static show(children: React.ReactElement, onClose?: () => any): string {
      const props = {
        children,
        visible: true,
        onChange(visible: boolean) {
          if (!visible) {
            staticAction.hide(key);
            onClose && onClose();
          }
        }
      } as any;

      const key = staticAction.show(
        <Component {...props} />,
      );

      return key;
    }

    static hide(key?: string) {
      staticAction.hide(key);
    }

    static hideAll() {
      staticAction.hideAll();
    }

    componentDidMount() {
      this.show();
    }

    componentDidUpdate(prevProps: PortalProps & T) {
      this.show();
    }

    componentWillUnmount() {
      this.portalKey && staticAction.hide(this.portalKey);
    }

    show() {
      this.portalKey = staticAction.show(
        (
          <Component
            {...this.props}
            ref={this.props.forwardRef}
            onChange={this.onChange}
          />
        ),
        this.portalKey,
      );
    }

    onChange = (visible: boolean) => {
      if (!visible) {
        this.portalKey && staticAction.hide(this.portalKey);
        this.portalKey = undefined;
      }

      const {onChange} = this.props;
      onChange && onChange(visible);
    };

    render() {
      return null;
    }
  }

  return hoistStatics(Portal, Component) as ComponentType<T>;
}
