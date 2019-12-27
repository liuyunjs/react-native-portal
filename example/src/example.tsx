/**
 * @Description : TODO
 * @Create on : 2019/11/19 23:08
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useGetSetState from 'react-use/lib/useGetSetState';
import { Portal, HOC, usePortalElement, pop } from 'react-native-portal-view';
import Modal from './components/modal';

const ModalHOC = HOC(Modal);

const ModalHook = (props: any) => {
  usePortalElement({
    children: <Modal {...props} />,
  });

  return null;
};

const ModalComponent = (props: any) => {
  return (
    <Portal>
      <Modal {...props} />
    </Portal>
  );
};

export default function App(props: any) {
  const [getState, setState] = useGetSetState<any>({
    hoc: false,
    hook: false,
    component: false,
  });

  function onPress(key: string) {
    return () => {
      setState({
        [key]: !getState()[key],
      });
    };
  }

  const { hoc, hook, component } = getState();

  return (
    <>
      <View style={styles.container}>
        <Text onPress={onPress('hoc')}>通过 HOC 创建 </Text>
        <Text onPress={onPress('hook')}>通过 hook 创建</Text>
        <Text onPress={onPress('component')}>通过 component 创建</Text>
      </View>
      {hoc && <ModalHOC onPress={pop} text="hoc" />}
      {hook && <ModalHook onPress={pop} text="hook" />}
      {component && <ModalComponent onPress={onPress('component')} text="component" />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});