import React from 'react';
import { useRootTag } from './useRootTag';
import { getCreatePortal } from './createPortal';
import { LegacyPortal, LegacyPortalProps } from './LegacyPortal';

export type PortalProps = {
  children: React.ReactElement;
  legacy?: boolean;
} & LegacyPortalProps;

export const Portal: React.FC<PortalProps> = (props) => {
  const rootTag = useRootTag();
  if (props.legacy) {
    return React.createElement(LegacyPortal, props);
  }
  const createPortal = getCreatePortal();
  return createPortal(props.children, rootTag);
};

Portal.defaultProps = {
  legacy: true,
};
