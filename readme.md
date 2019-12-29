# react-native-portal-view

## 特性

1. 可实现类似 h5 position：'fixed'效果
2. 通过创建函数创建，可创建多个相互不影响的根节点
3. 可多种方法使用
   - create 静态函数创建
   - Portal 组件渲染子组件
   - HOC 高阶函数创建
   - usePortalElement hook 创建
4. 提供一系列的静态函数操作 create pop destroy destroyAll shift update，包括创建、删除、更新

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

_提供一个根节点，必须包裹在组件外层_
**由 createPortalProvider 创建**

#### Props

| 名称     | 默认值 |        类型        | 描述                 |
| -------- | :----: | :----------------: | :------------------- |
| children |   -    | React.ReactElement | React.ReactElement[] | 子组件 |

#### 示例

```javascript
import * as React from 'react';
import { View, Text, AppRegistry } from 'react-native';
import { PortalProvider } from 'react-native-portal-view';

const App = () => {
  return (
    <PortalProvider>
      <View>
        <Text>hello world</Text>
      </View>
    </PortalProvider>
  );
};

AppRegistry.registerComponent('example', () => App);
```

### Portal

_将子组件渲染到 PortalProvider 的子节点_
**由 createPortal 返回**

#### Props

| 名称     | 默认值 |        类型        | 描述   |
| -------- | :----: | :----------------: | :----- |
| children |   -    | React.ReactElement | 子组件 |

#### 示例

```javascript
import * as React from 'react';
import { View, Text, AppRegistry } from 'react-native';
import { Portal, PortalProvider } from 'react-native-portal-view';

const HelloWorldExample = React.memo(() => {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, height: 150, backgroundColor: 'green' }}>
      <Text>hello world</Text>
    </View>
  );
});

const Example = () => {
  return (
    <Portal>
      <HelloWorldExample />
    </Portal>
  );
};

const App = () => {
  return (
    <PortalProvider>
      <View style={{ height: 100, marginTop: 100, backgroundColor: 'red' }}>
        <Example />
      </View>
    </PortalProvider>
  );
};

AppRegistry.registerComponent('example', () => App);
```

## 高阶组件

### HOC

_返回一个渲染到 PortalProvider 子节点的组件_
**由 createPortal 返回**

#### 示例

```javascript
import * as React from 'react';
import { View, Text, AppRegistry } from 'react-native';
import { HOC, PortalProvider } from 'react-native-portal-view';

const HelloWorldExample = React.memo(() => {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, height: 150, backgroundColor: 'green' }}>
      <Text>hello world</Text>
    </View>
  );
});

const HOCExample = HOC(HelloWorldExample);

const App = () => {
  return (
    <PortalProvider>
      <View style={{ height: 100, marginTop: 100, backgroundColor: 'red' }}>
        <HOCExample />
      </View>
    </PortalProvider>
  );
};

AppRegistry.registerComponent('example', () => App);
```

## hook

### usePortalElement

**由 createPortal 返回**

#### 示例

```javascript
import * as React from 'react';
import { View, Text, AppRegistry } from 'react-native';
import { usePortalElement, PortalProvider } from 'react-native-portal-view';

const HelloWorldExample = React.memo(() => {
  return (
    <View style={{ position: 'absolute', top: 0, left: 0, height: 150, backgroundColor: 'green' }}>
      <Text>hello world</Text>
    </View>
  );
});

const HookExample = () => {
  usePortalElement({
    children: <HelloWorldExample />,
  });

  return null;
};

const App = () => {
  return (
    <PortalProvider>
      <View style={{ height: 100, marginTop: 100, backgroundColor: 'red' }}>
        <HookExample />
      </View>
    </PortalProvider>
  );
};

AppRegistry.registerComponent('example', () => App);
```

## 方法

### createPortalProvider

_返回 Provider 组件， createPortal 方法，还有静态方法集合 portal，与默认的导出相互不影响_

#### 示例

```javascript
import { createPortalProvider } from 'react-native-portal-view';

const { Provider, createPortal, portal } = createPortalProvider();
const { Portal, create, update, pop, shift, destroy, destroyAll, usePortalElement, HOC } = portal;
```

### createPortal

_返回 portal 集合_

#### 示例

1. 使用默认导出，会渲染子组件到默认 PortalProvider 的子节点

```javascript
import { createPortal } from 'react-native-portal-view';

const {
  Portal,
  create,
  update,
  pop,
  shift,
  destroy,
  destroyAll,
  usePortalElement,
  HOC,
} = createPortal();
```

2. 创建一个新的 PortalProvider，与默认根节点可以同时存在

```javascript
import { createPortalProvider } from 'react-native-portal-view';

const { createPortal } = createPortalProvider();
const { Portal, create, update, pop, shift, destroy, destroyAll, usePortalElement, HOC } = portal;
```

### create (element: React.ReactElement) => PortalHandle

_通过静态函数，将传入的 Element 渲染到 PortalProvider 的子节点_
**Portal HOC usePortalElement 都由此函数实现**

#### 示例

```javascript
import * as React from 'react';
import { View, Text, AppRegistry } from 'react-native';
import { create, destroy, pop, PortalProvider } from 'react-native-portal-view';


const App = () => {
  const onPress = React.useCallback(() => {

      const update = () => {
        portalHandle.update(
            <View style={{ position: 'absolute', top: 0, left: 0, height: 150, backgroundColor: 'green' }}>
                <Text onPress={portalHandle}>点击销毁</Text>
                <Text onPress={pop}>点击销毁</Text>
                <Text onPress={() => destroy(portalHandle.id)}>点击销毁</Text>
            </View>
        );
      }

    const portalHandle = create(
        <View style={{ position: 'absolute', top: 0, left: 0, height: 150, backgroundColor: 'green' }}>
            <Text onPress={update}>点击更新</Text>
        </View>
    );
  }, []);

  return (
    <PortalProvider>
      <View style={{ height: 100, marginTop: 100, backgroundColor: 'red',alignItems: 'center', justifyContent: 'center}}>
        <Text onPress={onPress}>点击创建</Text>
      </View>
    </PortalProvider>
  );
};

AppRegistry.registerComponent('example', () => App);
```

### pop () => void

_删除最后通过 create Portal HOC usePortalElement 渲染出的节点_

### shift () => void

_删除当前存在的最开始通过 create Portal HOC usePortalElement 渲染出的节点_

### destroy (id: number) => void;

_指定删除通过 create Portal HOC usePortalElement 渲染出的节点_

### destroyAll () => void

_删除所有通过 create Portal HOC usePortalElement 渲染出的节点_

### update (id: number, element: React.ReactElement) => void

_指定更新当前存在的通过 create Portal HOC usePortalElement 渲染出的节点_
