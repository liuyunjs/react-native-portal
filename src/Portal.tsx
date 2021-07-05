import React from 'react';
// @ts-ignore
import { unstable_RootTagContext as RootTagContext } from 'react-native';
import { useRootTag } from './useRootTag';
import { getCreatePortal } from './createPortal';

type PortalProps = {
  children: React.ReactNode;
  fabric?: boolean;
};

export const Portal: React.FC<PortalProps> = ({ children, fabric }) => {
  const createPortal = getCreatePortal(fabric);

  return createPortal(children, useRootTag());
};
