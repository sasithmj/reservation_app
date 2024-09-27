import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import HomeScreen from '../Screens/HomeScreen';
import SearchResults from '../SearchResults/SerachResults';
import NewLost from '../imagePicker/NewLost';
import ProfilePage from '../Screens/profile/Profile';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install react-native-vector-icons

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Search') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'NewLost') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Search"
        component={SearchResults}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="NewLost"
        component={NewLost}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
