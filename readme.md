# react-native-portal-view

## 特性

将组件渲染到组件的其他位置
实现类似 h5 position：'fixed'效果

## 安装

> npm

```shell
npm i react-native-portal-view -S
```

> yarn

```shell
yarn add react-native-portal-view
```

## 组件

[comment]: <> (### PortalProvider)

[comment]: <> (_提供一个根节点，可以处于组件树种任何位置,_)

[comment]: <> (#### Props)

[comment]: <> (| 名称 | 默认值 | 类型 | 描述 |)

[comment]: <> (| -------- | :----: | :----------------: | :------------------- |)

[comment]: <> (| children | void | React.ReactNode | children |)

### Portal

包裹的组件会被渲染到根节点下

#### Props

| 名称     | 默认值 |      类型       | 描述   |
| -------- | :----: | :-------------: | :----- |
| children |  void  | React.ReactNode | 子组件 |



### PortalStore

#### getUpdater: (namespace?: string) => [PortalUpdater](#portalupdater)
返回指定的 PortalUpdater 示例，不存在会创建一个

#### setContainer: (componentOrElement: React.ComponentType | React.ReactElement) => void
设置一个容器，比如 react-redux 的 Provider，这样 Portal 渲染的内容也能访问 store 的数据

### PortalUpdater

提供一组方法用于使用函数的方式创建 Portal，添加的组件会渲染到 PortalProvider 中
使用前要在组件树中添加 PortalProvider

#### setContainer: (componentOrElement: React.ComponentType<any> | React.ReactElement) => void

添加一个容器，例如 react-redux 的 Provider 等;
所有使用 add 方法添加的组件都会渲染到这个容器中

#### add: (element: React.ReactElement) => string

添加一个组件，并且返回一个 key，这个 key 用于后续的删除及更新操作

#### update: (key: string, element: React.ReactElement) => void

更新指定的组件

#### remove: (key: string) => void;

删除指定组件

## 示例

```javascript
import * as React from 'react';
import { View, Text, AppRegistry } from 'react-native';
import { PortalProvider,Portal, getUpdater } from 'react-native-portal-view';
import useToggle from 'react-use/lib/useToggle';

getUpdater('default').setContainer(props => (
  <View
    {...props}
    pointerEvents="box-none"
    style={[props.style, StyleSheet.absoluteFill, { backgroundColor: 'pink' }]}
  />
));

// PortalStore.getUpdater('default').setContainer(
//   <View pointerEvents="box-none" style={[StyleSheet.absoluteFill, { backgroundColor: 'pink' }]} />,
// );

function Modal(props) {
  return (
    <View style={styles.container}>
      <Text onPress={props.onPress} style={styles.text}>
        Portal example {props.text}, click to destroy
      </Text>
    </View>
  );
}


function App() {
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

AppRegistry.registerComponent('example', () => App);
```
