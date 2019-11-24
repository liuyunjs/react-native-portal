/**
 * @Description : example portal modal
 * @Create on : 2019/11/24 16:16
 * @author liuyunjs
 * @version 0.0.1
 **/
import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type ModalProps = {
  visible: boolean,
  onChange: (visible: boolean) => any,
}

type ModalState = {
  visible: boolean,
  visibleProps?: boolean,
}

export default class Modal extends React.PureComponent<ModalProps, ModalState> {
  constructor(props: ModalProps) {
    super(props);

    console.log('Modal constructor is running');

    this.state = {
      visible: props.visible,
      visibleProps: props.visible,
    }
  }

  static getDerivedStateFromProps(nextProps: ModalProps, prevState: ModalState) {
    const {visible} = nextProps;
    if (prevState.visibleProps !== visible) {
      return {
        visible,
        visibleProps: visible,
      };
    }

    return null;
  }

  componentDidUpdate(prevProps: ModalProps, prevState: ModalState) {
    const {visible} = this.state;
    if (prevState.visible !== visible) {
      this.props.onChange(visible);
    }
  }

  private update(visible: boolean) {
    this.setState({visible});
  }

  private close = () => this.update(false);

  render() {
    return this.props.visible && (
      <View
        style={[
          StyleSheet.absoluteFillObject,
          {
            height: 300,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'red'
          },
        ]}
      >
        <Text onPress={this.close}>
          close modal in children
        </Text>
        {this.props.children}
      </View>
    )
  }
}
