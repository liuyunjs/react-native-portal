/**
 * @Description : TODO
 * @Create on : 2019/11/19 23:08
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useToggle from 'react-use/lib/useToggle';
import { Portal, PortalProvider } from 'react-native-portal-view';
import Modal from './components/modal';

const ModalComponent = (props: any) => {
  return (
    <Portal onDestroy={() => console.log('onDestroy')} onMount={() => console.log('onMount')}>
      <Modal {...props} />
    </Portal>
  );
};

export default function App() {
  const [visible, toggle] = useToggle(false);
  const [activeKey, setActiveKey] = React.useState(1);

  return (
    <>
      <View style={styles.container}>
        <Text onPress={toggle}> {visible ? '销毁' : '创建'}</Text>
        <Text
          onPress={() => {
            setActiveKey(activeKey === 1 ? 2 : 1);
          }}
        >
          切换Provider
        </Text>
      </View>
      {visible && <ModalComponent onPress={toggle} text={`component ${activeKey}`} />}

      <View style={styles.portalProvider1}>
        <PortalProvider
          maybeActive={() => {
            return activeKey === 1;
          }}
        />
      </View>

      <View style={styles.portalProvider2}>
        <PortalProvider
          maybeActive={() => {
            return activeKey === 2;
          }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  portalProvider1: {
    width: 300,
    height: 300,
    backgroundColor: 'red',
  },
  portalProvider2: {
    width: 400,
    height: 400,
    backgroundColor: 'blue',
  },
});
