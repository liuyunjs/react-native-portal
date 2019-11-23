/**
 * @Description : portal static action
 * @Create on : 2019/11/17 18:15
 * @author liuyunjs
 * @version 0.0.1
 **/
import * as React from 'react';
import RootSibings from 'react-native-root-siblings';
import {PortalCache} from './types';

/**
 * 在 react-native-root-siblings 的基础之上封装自己的一些逻辑
 * 已字符串对每个渲染的内容进行标识
 * 在销毁内容的时候可以传入 key 销毁指定内容，不传入的时候默认取最后一个渲染的 key
 *
 * 支持一次性销毁所有内容
 */
export default class {
  // 缓存
  private portalCache: PortalCache = {};

  /**
   * 渲染一些内容到跟节点
   * 如果是已经存在的内容，则更新内容
   * @param element
   * @param key
   */
  show(element: React.ReactElement, key?: string): string {
    const k = key || this.createKey();

    const cacheKey = `.${k}`;

    if (this.portalCache[cacheKey]) {
      this.portalCache[cacheKey].sibings.update(element);
    } else {
      this.portalCache[cacheKey] = {
        element,
        sibings: new RootSibings(element),
      };
    }

    return k;
  }

  /**
   * 更新指定内容
   * @param element
   * @param key
   */
  update(element: React.ReactElement, key?: string) {
    const k = this.getKey(key);
    k && this.portalCache[k].sibings.update(element);
  }

  /**
   * 销毁内容
   * @param key
   */
  hide(key?: string) {
    const k = this.getKey(key);

    if (!k) {
      return;
    }

    this.portalCache[k].sibings.destroy();

    delete this.portalCache[k];
  }

  /**
   * 销毁所有
   */
  hideAll() {
    while (true) {
      this.hide();
      const keys = Object.keys(this.portalCache);
      const len = keys.length;
      if (!len) {
        break;
      }
    }
  }

  /**
   * 获取对应的key
   * 如果未传入指定 key，则取缓存中最后渲染的一个
   * 如果返回 false 则不存在 key 对应的缓存组件
   * @param key
   */
  getKey(key?: string) {
    const keys = Object.keys(this.portalCache);
    const len = keys.length;

    if (!len) {
      return false;
    }

    if (key == null) {
      key = keys[len - 1].slice(1);
    }

    const cacheKey = `.${key}`;
    if (!this.portalCache[cacheKey]) {
      return false;
    }

    return cacheKey;
  }

  /**
   * 创建一个不跟缓存中已有的 key 重复的 key
   */
  private createKey(): string {
    const key = Math.random().toString(36).slice(2);
    if (this.portalCache[key]) {
      return this.createKey();
    }
    return key;
  }

  /**
   * 获取缓存内容
   */
  get caches(): PortalCache {
    return this.portalCache;
  }
}
