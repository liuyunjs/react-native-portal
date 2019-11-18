/**
 * @Description : portal toggle action
 * @Create on : 2019/11/17 15:52
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import {DeviceEventEmitter} from 'react-native';
import {AddAction} from './types';
import {ADD_PORTAL, REMOVE_PORTAL} from './event-name';


export default {
  add(element: React.ReactElement, key?: string): string {
    if (!key) {
      key = Math.random().toString(36).slice(2);
    }

    const action: AddAction = {key, element};

    DeviceEventEmitter.emit(ADD_PORTAL, action);

    return key;
  },

  remove(key: string) {
    DeviceEventEmitter.emit(REMOVE_PORTAL, key);
  }
}
