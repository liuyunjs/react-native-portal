import React from 'react';
// @ts-ignore
import { unstable_RootTagContext as RootTagContext } from 'react-native';

type PortalProps = {
  children: React.ReactNode;
  fabric?: boolean;
};

let createPortal: any;

const getCreatePortal = (fabric?: boolean) => {
  if (createPortal) return;
  createPortal = fabric
    ? require('react-native/Libraries/Renderer/shims/ReactFabric').createPortal
    : require('react-native/Libraries/Renderer/shims/ReactNative').createPortal;
};

export const Portal: React.FC<PortalProps> = ({ children, fabric }) => {
  getCreatePortal(fabric);
  const rootTag = React.useContext(RootTagContext);

  return createPortal(children, rootTag);
};
