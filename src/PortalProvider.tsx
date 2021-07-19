import React from 'react';
import { PortalPatcher } from './PortalPatcher';

export const PortalProvider: React.FC = ({ children }) => {
  return (
    <>
      {children}
      <PortalPatcher />
    </>
  );
};
