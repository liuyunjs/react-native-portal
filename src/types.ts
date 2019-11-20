/**
 * @Description : portal typescript types
 * @Create on : 2019/11/18 22:04
 * @author liuyunjs
 * @version 0.0.1
 **/
import * as React from 'react';
import RootSibings from 'react-native-root-siblings';


export type Portal = {
  key: string,
  sibings: RootSibings,
}

export type PortalProps = {
  onChange?: (visible: boolean) => any,
  visible?: boolean,
  forwardRef?: React.Ref<any>,
  onClose?: () => any,
}
