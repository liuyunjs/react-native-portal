import React from 'react';
// @ts-ignore
import { unstable_RootTagContext as RootTagContext } from 'react-native';
import { useRootTag } from './useRootTag';
import { getCreatePortal } from './createPortal';
import { LegacyPortal, LegacyPortalProps } from './LegacyPortal';

export type PortalProps =
  | {
      children: React.ReactElement;
      legacy?: false;
    }
  | ({
      legacy: true;
    } & LegacyPortalProps);

export const Portal: React.FC<PortalProps> = function Portal(props) {
  const rootTag = useRootTag();
  if (props.legacy) {
    return React.createElement(LegacyPortal, props);
  }
  const createPortal = getCreatePortal();
  return createPortal(props.children, rootTag);
};
