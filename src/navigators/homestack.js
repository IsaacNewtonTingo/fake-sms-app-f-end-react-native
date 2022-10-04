import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useNavigation} from '@react-navigation/native';
import Home from '../screens/home';
import MessageDetails from '../screens/message-details';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="MessageDetails"
        component={MessageDetails}
        options={({route}) => ({
          title: route.params.senderName,
          headerStyle: {
            backgroundColor: '#29293d',
          },
        })}
      />
    </Stack.Navigator>
  );
}
