/**
 * @Description : portal provider
 * @Create on : 2019/11/17 15:55
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import {View, StyleSheet, DeviceEventEmitter} from 'react-native';
import {AddAction, State} from './types';
import {ADD_PORTAL, REMOVE_PORTAL} from './event-name';

export default class extends React.PureComponent<any, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      portalList: [],
    };
    this.bindEvents();
  }

  componentWillUnmount() {
    this.bindEvents(true);
  }

  bindEvents(isRemove?: boolean) {
    const key = isRemove ? 'removeListener' : 'addListener';

    DeviceEventEmitter[key](ADD_PORTAL, this.addPortal);
    DeviceEventEmitter[key](REMOVE_PORTAL, this.removePortal);
  }

  private addPortal = (event: AddAction) => {
    this.setState((prevState: State): State => {
      const list = prevState.portalList.filter((item: AddAction) => item.key !== event.key);
      list.push(event);

      return {
        portalList: list,
      };
    });
  };

  private removePortal = (key: string) => {
    this.setState((prevState: State): State => {
      return {
        portalList: prevState.portalList.filter((item: AddAction) => item.key !== key),
      };
    });
  };

  render(): React.ReactElement {

    return (
      <>
        {this.props.children}
        <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
          {
            this.state.portalList.map(item => {
              return React.cloneElement(item.element, {key: item.key})
            })
          }
        </View>
      </>
    );
  }
}
