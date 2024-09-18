import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {doc, setDoc} from 'firebase/firestore';
import {db} from '../../../firebase';
import {useNavigation, useRoute} from '@react-navigation/native';

export default function BookRegistration() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState(''); // Email will be autofilled
  const [phoneNumber, setPhoneNumber] = useState('');
  const [destination, setDestination] = useState('');
  const [journeyType, setJourneyType] = useState('fromCampus');
  const [travelDate, setTravelDate] = useState(new Date());

  const route = useRoute();
  const navigation = useNavigation();
  const {seatNumber, seatId, date} = route.params;

  // Fetch email from AsyncStorage and autofill it
  useEffect(() => {
    const getEmailFromStorage = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem('userEmail');
        if (savedEmail) {
          setEmail(savedEmail); // Autofill the email field
        }
      } catch (error) {
        console.log('Error fetching email from AsyncStorage:', error);
      }
    };

    getEmailFromStorage(); // Call the function to fetch email on mount
  }, []);

  // Set journeyType automatically based on the selected date (Tuesday or Saturday)
  useEffect(() => {
    const travelDay = new Date(date).getDay();
    if (travelDay === 6) {
      setJourneyType('fromCampus'); // Saturday
    } else if (travelDay === 2) {
      setJourneyType('toCampus'); // Tuesday
    } else {
      Alert.alert('Error', 'Please select either a Tuesday or Saturday.');
    }
  }, [date]);

  // const validateDate = date => {
  //   const dayOfWeek = date.getDay();
  //   if (
  //     (journeyType === 'fromCampus' && dayOfWeek !== 6) || // Saturdays for fromCampus
  //     (journeyType === 'toCampus' && dayOfWeek !== 2) // Tuesdays for toCampus
  //   ) {
  //     return false;
  //   }
  //   return true;
  // };

  async function submitBooking() {
    setTravelDate(date);
    console.log(date);
    if (!fullName || !email || !phoneNumber || !travelDate) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // if (!validateDate(travelDate)) {
    //   Alert.alert(
    //     'Error',
    //     `Please select a valid travel date (Saturdays for "From Campus", Tuesdays for "To Campus")`,
    //   );
    //   return;
    // }

    try {
      await setDoc(
        doc(
          db,
          'reservations',
          `${email}_${seatId}_${date.toISOString().split('T')[0]}`,
        ),
        {
          fullName,
          email,
          phoneNumber,
          journeyType,
          travelDate: date, // Store only the date part in ISO format
          seatId,
          seat_state: true,
        },
      );

      // await setDoc(doc(db, 'reservations', seatId.toString()), {
      //   seat_state: true,
      // });

      Alert.alert('Success', 'Your seat has been booked successfully');
      navigation.navigate('BookSeats', {refreshSeats: true});
    } catch (error) {
      console.log('Error submitting data:', error);
      Alert.alert('Error', 'Failed to book the seat. Please try again.');
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Book Your Seat</Text>
      <Text style={styles.seatInfo}>Seat Number: {seatNumber}</Text>
      <Text style={styles.seatInfo}>{date.toISOString().split('T')[0]}</Text>

      <TextInput
        value={fullName}
        onChangeText={setFullName}
        placeholder="Full Name"
        style={styles.input}
      />

      <TextInput
        value={email} // Autofill email
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
      />

      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput
        value={destination}
        onChangeText={setDestination}
        placeholder="Destination"
        style={styles.input}
      />

      <Text style={styles.dateInfo}>
        {journeyType === 'fromCampus'
          ? 'This journey is From Campus (Saturdays only)'
          : 'This journey is To Campus (Tuesdays only)'}
      </Text>

      <TouchableOpacity style={styles.submitButton} onPress={submitBooking}>
        <Text style={styles.submitButtonText}>Book Seat</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  seatInfo: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  dateInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: -10,
    marginBottom: 15,
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#ff8c52',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
