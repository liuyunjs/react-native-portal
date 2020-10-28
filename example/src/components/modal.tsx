/**
 * @Description : example portal modal
 * @Create on : 2019/11/24 16:16
 * @author liuyunjs
 * @version 0.0.2
 **/
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Example(props: any) {
  return (
    <View style={styles.container}>
      <Text onPress={props.onPress} style={styles.text}>
        Portal example {props.text}, click to destroy
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 16,
    color: '#fff',
  },
});
