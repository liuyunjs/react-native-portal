import * as React from 'react';
import { PortalStore } from './PortalStore';

export const PortalStoreContext = React.createContext<PortalStore | null>(null);
