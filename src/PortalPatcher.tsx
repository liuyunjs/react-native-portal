import React from 'react';
import { PortalRender } from './PortalRender';
import PortalStore from './PortalStore';

export const PortalPatcher = React.memo(() => {
  PortalStore.init(React.useState([])[1]);

  const items: React.ReactNode[] = [];

  PortalStore.forEach((updater, namespace) => {
    items.push(<PortalRender updater={updater} key={namespace} />);
  });

  return <>{items}</>;
});
