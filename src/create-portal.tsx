/**
 * @Description : portal creator
 * @Create on : 2019/11/20 22:52
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import {ComponentType} from 'react';
import hoistStatics from 'hoist-non-react-statics'
import StaticAction from './static';
import {PortalProps} from './types';

export default function createPortal<T extends {}>(Component: ComponentType<T>) {
  const staticAction = new StaticAction();


  class Portal extends React.PureComponent<PortalProps & T> {
    portalKey?: string;

    static WrappedComponent = Component;
    static displayName = Component.displayName || Component.name || 'Component';

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

        const {onClose} = this.props;
        onClose && onClose();
      }

      const {onChange} = this.props;
      onChange && onChange(visible);
    };

    render() {
      return null;
    }
  }


  function show(children: React.ReactElement, props?: (PortalProps & T) | (() => any)): string {
    let p: any;
    let onClose: any;

    if (typeof props === 'function') {
      onClose = props;

      p = {
        children,
        visible: true,
        onChange(visible: boolean) {
          if (!visible) {
            staticAction.hide(key);
            onClose && onClose();
          }
        }
      }
    } else {
      onClose = props && props!.onClose;

      p = {
        visible: true,
        ...props,
        children,
        onChange(visible: boolean) {
          if (!visible) {
            staticAction.hide(key);
            onClose && onClose();
          }
          props && props!.onChange && props!.onChange(visible);
        }
      }
    }

    const key = staticAction.show(
      <Component {...p} />,
    );

    return key;
  }

  function hide(key?: string) {
    staticAction.hide(key);
  }

  function hideAll() {
    staticAction.hideAll();
  }

  return {
    Component: hoistStatics(Portal, Component) as ComponentType<PortalProps & T>,
    show,
    hide,
    hideAll,
  };
}
