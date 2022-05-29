import * as React from 'react';
import { SafeAreaView, Text } from 'react-native';
import { AnimatePresence, RMotionText } from 'rmotion';
import {
  Portal,
  PortalProvider,
  PortalStore,
  DefaultStore,
} from './library/main';
const store = new PortalStore();

DefaultStore.getUpdater().setContainer(AnimatePresence);

let index = 0;
export default function App() {
  const [list, setList] = React.useState<number[]>([]);
  const [list2, setList2] = React.useState<number[]>([-1]);

  return (
    <SafeAreaView>
      <PortalProvider store={store}>
        {list.map((item) => (
          <Portal store={store} key={item}>
            <Text
              onPress={() => {
                setList(list.filter((i) => i !== item));
              }}>
              test{item}
            </Text>
          </Portal>
        ))}
      </PortalProvider>
      <Text onPress={() => setList(list.concat([index++]))}>Show Portal</Text>
      <Text onPress={() => setList2(list2.concat([index++]))}>
        Show Portal2
      </Text>
      <PortalProvider>
        {list2.map((item) => (
          <Portal key={item}>
            <RMotionText
              from={{ opacity: 0 }}
              animate={{ opacity: 1, height: 20 }}
              exit={{ opacity: 0, height: 0 }}
              onPress={() => {
                setList2(list2.filter((i) => i !== item));
              }}>
              test{item}
            </RMotionText>
          </Portal>
        ))}
      </PortalProvider>
    </SafeAreaView>
  );
}
