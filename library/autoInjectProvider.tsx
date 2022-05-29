import * as React from 'react';
import { AppRegistry } from 'react-native';
import { PortalProvider } from './PortalProvider';

const registerComponent = AppRegistry.registerComponent;

export const autoInjectProvider = (inject = true) => {
  if (!inject) {
    AppRegistry.registerComponent = registerComponent;
  } else {
    AppRegistry.registerComponent = (appKey, getComponentFunc) => {
      const Component = getComponentFunc();

      const getComponent = () => {
        return function AppProvider(props: any) {
          return (
            <PortalProvider>
              <Component {...props} />
            </PortalProvider>
          );
        };
      };

      return registerComponent(appKey, getComponent);
    };
  }
};
