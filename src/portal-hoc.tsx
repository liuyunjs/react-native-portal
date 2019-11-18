/**
 * @Description : create portal component
 * @Create on : 2019/11/18 22:54
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import {ComponentType} from 'react';
import StaticAction from './static';
import {PortalProps} from './types';

export default function portalHOC<T extends {}>(Component: ComponentType<T>) {
  const staticAction = new StaticAction();

  return class Portal extends React.PureComponent<PortalProps & T> {
    private key?: string;
    private child: React.RefObject<ComponentType<T>> = React.createRef();

    // static show(component: React.ReactNode): string {
    //   return staticAction.show(
    //     <Component>
    //       {component}
    //     </Component>,
    //   );
    // }

    static hide() {
      staticAction.hide();
    }

    componentDidMount() {
      if (this.props.visible) {
        this.show();
      }
    }

    componentDidUpdate(prevProps: PortalProps & T) {
      if (prevProps.visible !== this.props.visible) {
        if (this.props.visible) {
          return this.show();
        }
        this.close();
      }
    }

    componentWillUnmount() {
      this.key && staticAction.hide(this.key);
    }

    close = () => this.child.current && (this.child.current as any).close && (this.child.current as any).close();

    private show() {
      this.key = staticAction.show(
        (
          <Component
            {...this.props}
            ref={this.child}
            onChange={this.onChange}
          />
        ),
      );
    }

    private onChange = (visible: boolean) => {
      if (!visible) {
        this.key && staticAction.hide(this.key);
        this.key = undefined;
      }

      const {onChange} = this.props;
      onChange && onChange(visible);
    };

    render() {
      return null;
    }
  }
}
