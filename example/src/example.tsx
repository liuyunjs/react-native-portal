/**
 * @Description : TODO
 * @Create on : 2019/11/19 23:08
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';

import { View, Text, StyleSheet } from 'react-native';
import useToggle from 'react-use/lib/useToggle';
import { Portal, getUpdater } from '../lib';
import Modal from './components/modal';

// PortalStore.getUpdater('default').setContainer(props => (
//   <View
//     {...props}
//     pointerEvents="box-none"
//     style={[props.style, StyleSheet.absoluteFill, { backgroundColor: 'pink' }]}
//   />
// ));
// getUpdater('default').setContainer(
//   <View pointerEvents="box-none" style={[StyleSheet.absoluteFill, { backgroundColor: 'pink' }]} />,
// );

export default function App() {
  const [visible, toggle] = useToggle(false);
  const portalKeyRef = React.useRef<string>();

  const onPress = () => {
    if (!portalKeyRef.current) {
      portalKeyRef.current = getUpdater('default').add(
        <Modal onPress={onPress} text="component modal use PortalStore" />,
      );
    } else {
      getUpdater('default').remove(portalKeyRef.current);
      portalKeyRef.current = undefined;
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text onPress={toggle}> {visible ? '销毁' : '创建'} 使用 Portal 组件</Text>
        <Text onPress={onPress}> 创建 使用 PortalStore 静态调用</Text>
      </View>
      {visible && (
        <Portal>
          <Modal onPress={toggle} text="component modal use createPortal" />
        </Portal>
      )}
      {/*<PortalProvider />*/}
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
