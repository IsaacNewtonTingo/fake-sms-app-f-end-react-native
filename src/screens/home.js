import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TextInput,
  Modal,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
const messages = require('../data/default-messages.json');

import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';

import dateFormat, {masks} from 'dateformat';

import firestore from '@react-native-firebase/firestore';

export default function Home({navigation}) {
  const [showModal, setShowModal] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [code, setCode] = useState('');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('1045.00');
  const [createdAt, setCreatedAt] = useState('');

  const [message, setMessage] = useState('');

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getMessage();
  }, []);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getMessage();
    // wait(2000).then(() => setRefreshing(false));
  }, []);

  async function postMessage() {
    const url = 'https://fake-sms-app.herokuapp.com/api/post-message';

    setIsPosting(true);
    await axios
      .post(url, {
        code,
        amount,
        account,
      })
      .then(response => {
        Alert.alert(response.data.message);
        setIsPosting(false);
        console.log(response.data);
        getMessage();
        setShowModal(false);
      })
      .catch(err => {
        console.log(err);
        setIsPosting(false);
      });
  }

  async function firebasePost() {
    await firestore()
      .collection('Messages')
      .add({
        code,
        amount,
        account,
        balance,
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  }

  async function getMessage() {
    const url = 'https://fake-sms-app.herokuapp.com/api/get-message';

    await axios
      .get(url)
      .then(response => {
        console.log(response.data);
        setLoadingData(false);

        setCode(response.data[0].code);
        setAmount(response.data[0].amount);
        setAccount(response.data[0].account);
        setCreatedAt(response.data[0].createdAt);

        setMessage(
          `${code} Confirmed. Ksh${amount} sent to ZURI GENESIS CO LTD for account ${account} on ${dateFormat(
            createdAt,
            'shortDate',
          )} at ${dateFormat(
            createdAt,
            'shortTime',
          )} New M-PESA balance is Ksh${balance}. Transaction cost, Ksh0.00.Amount you can transact within the day is 299,775.00. Pay with M-PESA GlobalPay virtual Visa card linked to MPESA wallet. Click https://bit.ly/3LQTXIT`,
        );

        setRefreshing(false);
      })
      .catch(err => {
        setLoadingData(false);
        console.log(err);
      });
  }

  if (loadingData == true) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator color="white" size="large" />
        <Text style={{color: 'white', fontWeight: '700', marginTop: 10}}>
          Loading data
        </Text>
      </View>
    );
  }

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

        <TouchableOpacity
          onPress={() => setShowModal(true)}
          style={styles.menuIcon}>
          <Entypo name="dots-three-vertical" size={17} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.flatlistContainer}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{paddingTop: 20}}
          showsVerticalScrollIndicator={false}
          data={messages}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MessageDetails', {
                  listName: item.name,
                  listTime: item.time,
                  listMessage: item.message,
                  listIcon: item.icon,

                  time: createdAt,
                  message: message,
                });
              }}
              style={styles.messageContainer}
              key={item.name}>
              <Image style={styles.icon} source={{uri: item.icon}} />

              <View style={styles.nameAndMessageContainer}>
                <Text style={styles.nameText}>{item.name}</Text>
                <Text style={styles.messageText}>
                  {item.name === 'MPESA'
                    ? message.slice(0, 80) + '...'
                    : item.message.length <= 80
                    ? item.message
                    : item.message.slice(0, 80) + '...'}
                </Text>
                <Text style={styles.timeText}>
                  {item.name === 'MPESA'
                    ? dateFormat(createdAt, 'shortTime')
                    : item.time}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.subHeading}>Pay Zuri</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter account number"
              value={account}
              placeholderTextColor="gray"
              onChangeText={setAccount}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Enter code"
              value={code}
              placeholderTextColor="gray"
              onChangeText={setCode}
            />

            <TextInput
              style={styles.modalInput}
              placeholder="Enter amount"
              value={amount}
              placeholderTextColor="gray"
              onChangeText={text => setAmount(text)}
            />

            {isPosting == false ? (
              <TouchableOpacity
                onPress={firebasePost}
                style={[
                  styles.button,
                  {backgroundColor: '#006699', width: '80%'},
                ]}>
                <Text style={styles.buttonText}>Finish</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                disabled={true}
                style={[
                  styles.button,
                  {backgroundColor: '#006696', width: '80%'},
                ]}>
                <ActivityIndicator size={20} color="white" />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => setShowModal(false)}
              style={[
                styles.button,
                {backgroundColor: '#ff3300', width: '80%'},
              ]}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    width: 350,
    height: 400,
    justifyContent: 'center',
    shadowColor: 'white',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  modalInput: {
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {height: 5, width: 5},
    shadowRadius: 5,
    shadowOpacity: 0.1,
    elevation: 10,
    backgroundColor: '#e6e6ff',
    height: 50,
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'black',
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#a162f7',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '800',
  },
});
