/**
 * @Description : portal static action
 * @Create on : 2019/11/17 18:15
 * @author liuyunjs
 * @version 0.0.1
 **/
import * as React from 'react';
import RootSibings from 'react-native-root-siblings';
import findIndex from 'lodash/findIndex';
import {Portal} from './types';

export default class {
  private portalCache: Portal[] = [];

  show(element: React.ReactElement, key?: string): string {
    const k = key || Math.random().toString(36).slice(2);

    for (let item of this.portalCache) {
      if (k === item.key) {
        item.sibings.update(element);
        return k;
      }
    }

    this.portalCache.push({
      key: k,
      sibings: new RootSibings(element),
    });

    return k;
  }

  update(element: React.ReactElement, key?: string) {
    const index = this.getIndex(key);

    if (index === undefined) {
      return;
    }

    this.portalCache[index!].sibings.update(element);
  }

  hide(key?: string) {
    const index = this.getIndex(key);

    if (index === undefined) {
      return;
    }

    this.portalCache[index!].sibings.destroy();

    this.portalCache.splice(index!, 1);
  }

  hideAll() {
    while (true) {
      this.hide();
      if (!this.portalCache.length) {
        break;
      }
    }
  }

  private getIndex(key?: string): number | undefined {
    const len = this.portalCache.length;
    if (!len) {
      return;
    }

    let index: number;
    if (key) {
      const index = findIndex(this.portalCache, (i) => i.key === key);
      if (index === -1) {
        return;
      }
    } else {
      index = len - 1;
    }

    return index!;
  }
}
