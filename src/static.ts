/**
 * @Description : portal static action
 * @Create on : 2019/11/17 18:15
 * @author liuyunjs
 * @version 0.0.1
 **/
import React from 'react';
import action from './action';

export default class {
  private portalCache: string[] = [];

  show(element: React.ReactElement, key?: string): string {
    const k = action.add(element, key);

    const index = this.portalCache.indexOf(k);

    if (index !== -1) {
      this.portalCache.splice(index, 1, k);
    } else {
      this.portalCache.push(k);
    }

    return k;
  }

  hide(key?: string) {
    if (!key) {
      key = this.portalCache[this.portalCache.length - 1];
    }

    this.portalCache = this.portalCache.filter(i => i !== key);
    action.remove(key);
  }

  hideAll() {
    while (true) {
      this.hide();
      if (!this.portalCache.length) {
        break;
      }
    }
  }
}
