import React from 'react';
import { PortalUpdater } from './PortalUpdater';

export const PortalRender = React.memo<{ updater: PortalUpdater }>(
  function PortalRender({ updater }) {
    updater.init(React.useState([])[1]);
    return updater.render();
  },
);
