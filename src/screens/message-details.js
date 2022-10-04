import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
} from 'react-native';
const messages = require('../data/default-messages.json');

export default function MessageDetails({route, navigation}) {
  return (
    <View style={styles.container}>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14141f',
  },
});
