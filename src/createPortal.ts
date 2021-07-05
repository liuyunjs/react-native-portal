import React from 'react';

export const getCreatePortal = (() => {
  let createPortal: (children: React.ReactNode, tag: number, key?: string) => React.ReactPortal;

  return (fabric?: boolean) => {
    if (!createPortal) {
      createPortal = fabric
        ? require('react-native/Libraries/Renderer/shims/ReactFabric').createPortal
        : require('react-native/Libraries/Renderer/shims/ReactNative').createPortal;
    }
    return createPortal;
  };
})();

export const createPortal = getCreatePortal();
