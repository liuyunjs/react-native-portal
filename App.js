import React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { AnimatePresence, RMotionView } from 'rmotion';
import { Portal, PortalStore } from './library/main';

PortalStore.getUpdater().setContainer(AnimatePresence);

export default function App() {
  const [v, setV] = React.useState(false);
  return (
    <SafeAreaView>
      <Text onPress={() => setV(true)}>Show Portal</Text>
      <Portal>
        {v && (
          <RMotionView
            style={{ height: 300, backgroundColor: 'red' }}
            from={{ translateY: 300 }}
            animate={{ translateY: 0 }}
            exit={{ translateY: 300 }}>
            <Text onPress={() => setV(false)}>Close Portal</Text>
          </RMotionView>
        )}
      </Portal>
    </SafeAreaView>
  );
}
