import React from 'react';
import { PortalPatcher } from './PortalPatcher';
import { Portal } from './Portal';

export const PortalProvider: React.FC = ({ children }) => {
  return (
    <>
      {children}
      <Portal>
        <PortalPatcher />
      </Portal>
    </>
  );
};
