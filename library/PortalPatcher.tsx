import * as React from 'react';
import { PortalRender } from './PortalRender';
import { PortalStore } from './PortalStore';

export const PortalPatcher = React.memo<{
  store: PortalStore;
}>(function PortalPatcher({ store }) {
  store.init(React.useState([])[1]);

  const items: React.ReactNode[] = [];

  store.forEach((updater, namespace) => {
    items.push(<PortalRender updater={updater} key={namespace} />);
  });

  return <>{items}</>;
});
