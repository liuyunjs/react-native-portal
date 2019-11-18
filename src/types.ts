/**
 * @Description : portal typescript types
 * @Create on : 2019/11/18 22:04
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';

export type AddAction = {
  key: string,
  element: React.ReactElement
}

export type State = {
  portalList: AddAction[],
}

export type PortalProps = {
  onChange?: (visible: boolean) => any,
  visible?: boolean,
}

// export interface BaseProps {
//   children?: React.ReactNode,
// }
