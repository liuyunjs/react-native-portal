import React from 'react';

let defaultFabric = false;
export const setDefaultFabric = (fabric: boolean) => {
  defaultFabric = fabric;
};

export const getCreatePortal = (() => {
  const cached = new Map<
    boolean,
    (children: React.ReactNode, tag: number, key?: string) => React.ReactPortal
  >();

  return (fabric: boolean = defaultFabric) => {
    if (!cached.has(fabric)) {
      cached.set(
        fabric,
        fabric
          ? require('react-native/Libraries/Renderer/shims/ReactFabric').createPortal
          : require('react-native/Libraries/Renderer/shims/ReactNative').createPortal,
      );
    }
    return cached.get(fabric)!;
  };
})();

export const createPortal = getCreatePortal();
