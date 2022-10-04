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

import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';

export default function Home({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.iconAndInput}>
        <Fontisto
          style={styles.searchIcon}
          name="search"
          size={17}
          color="white"
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="white"
        />

        <TouchableOpacity style={styles.menuIcon}>
          <Entypo name="dots-three-vertical" size={17} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.flatlistContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={messages}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MessageDetails', {
                  senderName: item.name,
                });
              }}
              style={styles.messageContainer}
              key={item.name}>
              <Image style={styles.icon} source={{uri: item.icon}} />

              <View style={styles.nameAndMessageContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.messageText}>
                  {item.message.length <= 80
                    ? item.message
                    : item.message.slice(0, 80) + '...'}
                </Text>
                <Text style={styles.timeText}>{item.time}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <TouchableOpacity style={styles.newChat}>
        <Text style={styles.newChatText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#14141f',
  },

  iconAndInput: {},
  menuIcon: {
    position: 'absolute',
    zIndex: 1,
    right: 35,
    top: 32,
  },
  searchIcon: {
    position: 'absolute',
    zIndex: 1,
    left: 35,
    top: 32,
  },
  input: {
    width: '90%',
    height: 40,
    borderRadius: 30,
    color: 'white',
    backgroundColor: '#595959',
    paddingHorizontal: 40,
    marginTop: 20,
    alignSelf: 'center',
  },
  newChat: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 20,
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#7575a3',
    borderColor: '#99b3e6',
    borderWidth: 2,
  },
  newChatText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 40,
  },
  messageContainer: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
  },
  nameText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
  },
  messageText: {
    color: '#999999',
  },
  timeText: {
    color: '#999999',
    position: 'absolute',
    right: 0,
  },
  icon: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  flatlistContainer: {
    flex: 1,
    padding: 20,
  },
  nameAndMessageContainer: {
    flex: 1,
  },
});
