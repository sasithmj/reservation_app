import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SigninWelcomeScreen from '../Screens/authScreens/SigninWelcomeScreen';
import HomeScreen from '../Screens/HomeScreen';
import HomeMap from '../Components/Homemap';
import SearchResults from '../SearchResults/SerachResults';
import DestinationSearch from '../DestinationSearch/DestinationSearch';
import Signup from '../Screens/authScreens/Signup';
import Registration from '../Screens/authScreens/Registration';
import NewLost from '../imagePicker/NewLost';
import BookSeats from '../Components/BookSeats/BookSeats';
import BookRegitration from '../Components/BookSeats/BookRegitration';
import PaymentScreen from '../Components/BookSeats/PaymentScreen';
import PaymentView from '../Components/BookSeats/PaymentView';
import Lost from '../imagePicker/Lost';
import HomeSearch from '../Components/HomeSearch/HomeSearch';
import ProfilePage from '../Screens/profile/Profile';
import Notifications from '../Screens/profile/Notifications';
import ReservationHistory from "../Screens/profile/ReservationHistoryScreen"

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="indexScreen"
        component={SearchResults}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="DestinationSearch"
        component={DestinationSearch}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="newLost"
        component={NewLost}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="BookSeats"
        component={BookSeats}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BookRegistration"
        component={BookRegitration}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentView"
        component={PaymentView}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="HomeSearch"
        component={HomeSearch}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="SearchResults"
        component={SearchResults}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ReservationHistory"
        component={ReservationHistory}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'HomeScreen') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff8c52',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          paddingBottom: 5,
        },
      })}>
      <Tab.Screen name="HomeScreen" component={HomeStack} />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="profile" component={ProfilePage} />
    </Tab.Navigator>
  );
}

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="SigninWelcomeScreen"
        component={SigninWelcomeScreen}
      />
      <Stack.Screen name="SigninScreen" component={Signup} />
      <Stack.Screen name="Registration" component={Registration} />
      <Stack.Screen name="HomeScreen" component={TabNavigator} />
    </Stack.Navigator>
  );
}
