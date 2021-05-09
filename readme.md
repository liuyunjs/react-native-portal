# react-native-portal-view

## 特性

实现类似 h5 position：'fixed'效果

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
| children |   void    | React.ReactNode | children |


### Portal
_包裹的组件会被渲染到所有处于活跃状态的 PortalProvider 下_

#### Props

| 名称     | 默认值 |        类型        | 描述                 |
| -------- | :----: | :----------------: | :------------------- |
| children |   void    | React.ReactNode | 子组件 |


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
    <Portal >
      <Modal {...props} />
    </Portal>
  );
};


function App() {
  const [visible, toggle] = useToggle(false);
  const [activeKey, setActiveKey] = React.useState(1);

  return (
    <PortalProvider>
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

    </PortalProvider>
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

