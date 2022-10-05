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
  Dimensions,
} from 'react-native';

const {width} = Dimensions.get('window');
const messages = require('../data/default-messages.json');

import dateFormat, {masks} from 'dateformat';

export default function MessageDetails({route, navigation}) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.messageContainer}>
        <Image style={styles.icon} source={{uri: route.params.listIcon}} />

        <View>
          <Text style={styles.timeText}>Yesterday 19:49</Text>

          <View style={styles.messageItem}>
            <Text style={styles.messageText}>
              {route.params.listName === 'MPESA'
                ? route.params.message
                : route.params.listMessage}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.messageContainer}>
        <Image style={styles.icon} source={{uri: route.params.listIcon}} />

        <View>
          <Text style={styles.timeText}>Today 15:27</Text>

          <View style={styles.messageItem}>
            <Text style={styles.messageText}>
              QJ12ZF2078 Confirmed.You have recieved Ksh200.00 from ERNEST GHATI
              0788980099 ON 10/04/22 at 3:27PM New M-PESA balance is
              Ksh2890.00.Download M-PESA app on https://bit.ly/mpesaappsm & get
              500MB
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.messageContainer}>
        <Image style={styles.icon} source={{uri: route.params.listIcon}} />

        <View>
          <Text style={styles.timeText}>
            {route.params.listName === 'MPESA'
              ? dateFormat(route.params.time, 'shortTime')
              : route.params.listTime}
          </Text>

          <View style={styles.messageItem}>
            <Text style={styles.messageText}>
              {route.params.listName === 'MPESA'
                ? route.params.message
                : route.params.listMessage}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cantContainer}>
        <Text style={styles.cantText}>Can't reply to this conversation</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#14141f',
    padding: 20,
    paddingBottom: 100,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width / 1.5,
  },
  cantContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    width: '100%',
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  cantText: {},
  timeText: {
    color: 'white',
    textAlign: 'center',
    marginVertical: 20,
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  messageItem: {
    backgroundColor: '#333333',
    padding: 20,
    borderRadius: 20,
  },
  messageText: {
    color: 'white',
  },
});
