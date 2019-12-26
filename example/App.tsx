/**
 * @Description : TODO
 * @Create on : 2019/11/19 23:08
 * @author liuyunjs
 * @version 0.0.2
 * @Update on : 2019/12/26 23:17
 **/

import * as React from 'react';
import portal from './src';
import Example from './src/example';

const {Provider} = portal;

export default () => {
  return (
    <Provider>
      <Example />
    </Provider>
  );
};
