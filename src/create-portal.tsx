/**
 * @Description : portal creator
 * @Create on : 2019/11/20 22:52
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import hoistStatics from 'hoist-non-react-statics';
import StaticAction from './static';
import {PortalProps} from './types';

const staticDefaultProps: PortalProps & {key?: string} = {
  ifHideDestroy: true,
};

/**
 * 生成一个渲染在根节点下的组件，并且可以使用静态方法调用
 * 被包装的组件会接收到 visible 和 onChange 两个 props
 * 组件应该根据 visible 实现显示隐藏的渲染逻辑
 * 应该在显示隐藏过程结束后调用 onChange 方法并且传入当前状态
 *
 * 组件还接收一个 ifHideDestroy props
 * 表示是否在被包装组件隐藏后完全销毁被包装组件
 * 注意：如果是使用静态方法调用，并且设置了 ifHideDestroy 为 false 的时候，应该自己手动去调用 destroy 方法销毁，不然会一直存在内存中
 * @param Component
 */
export default function createPortal<T extends {}>(Component: React.ComponentType<T>) {
  const action = new StaticAction();

  /**
   * 展示指定内容
   * @param children
   * @param props
   */
  function show(children: React.ReactElement, props?: T & PortalProps & {key?: string}): string {
    const opts = {...staticDefaultProps, ...props};
    let {key} = opts ;
    delete opts.key;
    // 合成props
    const p = {
      ...opts,
      children,
      visible: true,
      onChange(visible: boolean) {

        // 在内容关闭之后，并且需要在关闭之后销毁内容，调用销毁方法
        if (!visible && opts.ifHideDestroy) {
          action.hide(key);
        }

        if (opts.onChange) {
          opts.onChange(visible);
        }
      }
    } as any;

    // 显示内容
    key = action.show(<Component {...p} />, key);

    return key;
  }

  /**
   * 关闭内容，将传入组件的props visible 设置为false，组件应该根据该 props 实现关闭逻辑
   * @param key
   */
  function hide(key?: string) {
    const k = action.getKey(key);

    if (!k) {
      return;
    }

    const target = action.caches[k];
    target.sibings.update(React.cloneElement(target.element, {visible: false}));
  }

  class Portal extends React.PureComponent<PortalProps & T> {
    portalKey?: string;

    static defaultProps: PortalProps = {
      ifHideDestroy: true,
    };
    // 被包装的组件
    static WrappedComponent = Component;
    // 组件名称
    static displayName = `createPortal(${Component.displayName || Component.name || 'Component'})`;

    componentDidMount() {
      // 在需要显示是才渲染组件
      if (this.props.visible) {
        this.show();
      }
    }

    componentDidUpdate(prevProps: PortalProps & T) {
      // 当选择隐藏组件后销毁时
      // 在组件 改变 visible 的值为 false 之后，父组件 setState 改变 visible 为 false 之后
      // 此时如果不阻止，被包装组件会再次被创建
      if (!this.portalKey && !this.props.visible) {
        return;
      }
      this.show();
    }

    componentWillUnmount() {
      this.portalKey && action.hide(this.portalKey);
    }

    show() {
      // 将内容渲染在根节点下
      this.portalKey = action.show(
        (
          <Component
            {...this.props}
            onChange={this.onChange}
          />
        ),
        this.portalKey,
      );
    }

    onChange = (visible: boolean) => {
      // 当被包装组件关闭后，如果需要在关闭时销毁组件，执行销毁逻辑
      if (!visible && this.props.ifHideDestroy) {
        this.portalKey && action.hide(this.portalKey);
        this.portalKey = undefined;
      }

      const {onChange} = this.props;
      onChange && onChange(visible);
    };

    render() {
      return null;
    }
  }

  return {
    // 包装后的组件
    Component: hoistStatics(Portal, Component) as React.ComponentType<PortalProps & T>,

    // 以下为静态方法
    // 展示被包装组件
    show,
    // 隐藏被包装组件
    hide,
    // 更新被包装组件
    update: action.update.bind(action),
    // 销毁所有被包装组件
    destroyAll: action.hideAll.bind(action),
    // 销毁
    destroy: action.hide.bind(action),
  };
}
