import React from 'react';
import { PortalUpdater } from './PortalUpdater';

export const PortalRender: React.FC<{ updater: PortalUpdater }> = ({ updater }) => {
  updater.init(React.useState([])[1]);

  return updater.render();
};
