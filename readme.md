# react-native-portal-view

## 特性

1. 可实现类似 h5 position：'fixed'效果
2. 可以有多个相互不影响的根节点
3. 可以同时将一个组件渲染到多个根节点

## 安装

> npm

```
npm i react-native-portal-view -S
```

> yarn

```
yarn add react-native-portal-view
```

## 组件

### PortalProvider

_提供一个根节点，可以处于组件树种任何位置_

#### Props

| 名称     | 默认值 |        类型        | 描述                 |
| -------- | :----: | :----------------: | :------------------- |
| maybeActive |   () => true    | function():boolean | 返回值代表当前 Provider 是否处于活跃状态 |


### Portal
_包裹的组件会被渲染到所有处于活跃状态的 PortalProvider 下_

#### Props

| 名称     | 默认值 |        类型        | 描述                 |
| -------- | :----: | :----------------: | :------------------- |
| children |   void    | React.ReactNode | 子组件 |
| onMount |   void    | function(): void | Portal 的 componentDidMount 触发 |
| onDestroy |   void    | function(): void | Portal 的 componentWillunmount 触发 |


#### 示例

```javascript
import * as React from 'react';
import { View, Text, AppRegistry } from 'react-native';
import { PortalProvider,Portal } from 'react-native-portal-view';
import useToggle from 'react-use/lib/useToggle';

function Modal(props) {
  return (
    <View style={styles.container}>
      <Text onPress={props.onPress} style={styles.text}>
        Portal example {props.text}, click to destroy
      </Text>
    </View>
  );
}

const ModalComponent = (props: any) => {
  return (
    <Portal onDestroy={() => console.log('onDestroy')} onMount={() => console.log('onMount')}>
      <Modal {...props} />
    </Portal>
  );
};


function App() {
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

AppRegistry.registerComponent('example', () => App);
```

