import * as React from 'react';
import { PortalProvider } from './PortalProvider';

let queue: PortalProvider[] = [];

export const PortalQueue = {
  push(portalProvider: PortalProvider) {
    queue.push(portalProvider);
  },

  pop(portalProvider: PortalProvider) {
    queue = queue.filter(item => item !== portalProvider);
  },

  add(element: React.ReactNode) {
    return queue
      .filter(portalProvider => portalProvider.props.maybeActive())
      .map(portalProvider => portalProvider.add(element));
  },
};
