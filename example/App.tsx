/**
 * @Description : TODO
 * @Create on : 2019/11/19 23:08
 * @author liuyunjs
 * @version 0.0.1
 **/

import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createPortal} from 'react-native-portal-view';

class Modal2 extends React.PureComponent<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      visible: props.visible,
      visibleProps: props.visible,
    }
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (prevState.visibleProps !== nextProps.visible) {
      return {
        visible: nextProps.visible,
        visibleProps: nextProps.visible,
      };
    }

    return null;
  }


  componentDidMount() {
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.visible !== this.state.visible) {
      this.props.onChange(this.state.visible);
    }
  }

  render() {
    const v = (this.props as any).visible;
    return v ? (
      <View style={[StyleSheet.absoluteFillObject, {
        height: 300,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red'
      }]}>
        <Text onPress={() => this.setState({visible: false})}>
          close modal
        </Text>
        {this.props.children}
      </View>
    ) : null
  }
}

const Modal = createPortal(Modal2);
const ModalComponent = Modal.Component;

export default class App extends React.PureComponent {
  state = {
    visible: false,
  };

  render() {

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ModalComponent ifHideDestroy={false} onChange={(visible: boolean) => this.setState({visible})}
                        visible={this.state.visible}>
          <View>
            <Text onPress={() => this.setState({visible: false})}>
              close
            </Text>
          </View>
        </ModalComponent>
        <View>
          <Text onPress={() => {
            Modal.show(
              <View>
                <Text onPress={() => {
                  Modal.hide();
                }}>
                  close
                </Text>
              </View>,
            )
          }}>
            open
          </Text>
        </View>
      </View>
    )
  }
}
