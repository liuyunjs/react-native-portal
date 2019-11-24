/**
 * @Description : TODO
 * @Create on : 2019/11/19 23:08
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import {View, Text} from 'react-native';
import {createPortal} from 'react-native-portal-view';
import Modal from './src/components/modal';

const portalModal = createPortal(Modal);

const PortalModal = portalModal.Component;

export default class App extends React.PureComponent {
  state = {
    visible: false,
  };

  private key?: string;

  ifHideDestroy: boolean = false;

  componentWillUnmount() {
    if (!this.ifHideDestroy && this.key) {
      portalModal.hide(this.key);
    }
  }

  private onChange = (visible: boolean) => this.setState({visible});

  private close = () => this.onChange(false);

  private open = () => this.onChange(true);

  private closeUseStaticFunction = () => portalModal.hide();

  private openUseStaticFunction = () => {
    this.key = portalModal.show(
      this.getModalChildren(),
      {
        id: this.key,
        ifHideDestroy: this.ifHideDestroy,
        onChange(visible: boolean){

        },
        visible: true,
      },
    )
  };

  private getModalChildren() {
    return (
      <>
        <View>
          <Text onPress={this.close}>
            close use setState
          </Text>
        </View>
        <View>
          <Text onPress={this.closeUseStaticFunction}>
            close use static
          </Text>
        </View>
      </>
    )
  }

  render() {

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <PortalModal
          ifHideDestroy={this.ifHideDestroy}
          onChange={this.onChange}
          visible={this.state.visible}
        >
          {this.getModalChildren()}
        </PortalModal>
        <View>
          <Text onPress={this.open}>
            open use setState
          </Text>
        </View>
        <View>
          <Text onPress={this.openUseStaticFunction}>
            open use static
          </Text>
        </View>
      </View>
    )
  }
}
