import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function BookRegistration() {
  const [username, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('');

  const route = useRoute();
  const navigation = useNavigation();
  const { seatNumber, seatId } = route.params; // Retrieve seatNumber and seatId from params

  // Function to handle seat selection
  const onSelectSeat = async () => {
    try {
      // Update seat status in Firebase
      await setDoc(doc(db, 'reservations', seatId.toString()), {
        seat_state: true,
      });
      Alert.alert('Seat selected successfully');
    } catch (error) {
      console.error('Error booking seat:', error);
      Alert.alert('Failed to book the seat. Please try again.');
    }
  };

  async function create() {
    try {
      // Submit user data to Firebase
      await setDoc(doc(db, 'users', `${username}_${seatId}`), {
        username,
        number,
        email,
        destination,
        seatNumber :  seatNumber,
      });
  
      // Update seat state in Firebase
      await setDoc(doc(db, 'reservations', seatId.toString()), {
        seat_state: true,
      });
  
      // Show success alert
      Alert.alert('Data submitted successfully');
  
      // Navigate back to BookSeats and trigger seat refresh
      navigation.navigate('BookSeats', { refreshSeats: true });
    } catch (error) {
      console.log('Error submitting data:', error);
      Alert.alert('Failed to submit data. Please try again.');
    }
  }
  

  return (
    <View style={styles.container}>
      <TextInput
        value={username}
        onChangeText={(text) => setName(text)}
        placeholder='Username'
        style={styles.input}
      />
      
      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder='Email'
        style={styles.input}
      />
      <TextInput
        value={destination}
        onChangeText={(text) => setDestination(text)}
        placeholder='Destination'
        style={styles.input}
      />
      <Button title="Submit data" onPress={create} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 4,
  },
});
