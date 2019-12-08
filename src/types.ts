/**
 * @Description : portal typescript types
 * @Create on : 2019/11/18 22:04
 * @author liuyunjs
 * @version 0.0.19
 **/
import * as React from 'react';
import RootSibings from 'react-native-root-siblings';

export interface PortalProps {
  // 状态改变监听器
  onChange?: (visible: boolean) => any;
  // 控制状态是否需要改变
  visible?: boolean;
  // 是否需要在关闭后销毁
  ifHideDestroy?: boolean;
  id?: string;

  prefix?: string;
}

export type PortalCache = {
  [key: string]: {
    element: React.ReactElement;
    sibings: RootSibings;
  };
};
