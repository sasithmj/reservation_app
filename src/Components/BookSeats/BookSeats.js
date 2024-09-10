import React, { useState, useEffect } from 'react';
import { View, Image, FlatList, TouchableOpacity, Alert, StyleSheet, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../../../firebase';

// Function to initialize seat states
const initializeSeats = (count) =>
  Array.from({ length: count }, (_, index) => ({
    seatId: index + 1,
    seatNumber: index + 1,
    empty: true,
    selected: false,
  }));

const BookSeats = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [seats, setSeats] = useState(initializeSeats(55));

  // Fetch seat data from Firebase
  const fetchSeatData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'reservations'));
      const updatedSeats = seats.map((seat) => {
        const docSnapshot = querySnapshot.docs.find((doc) => doc.id === seat.seatId.toString());
        if (docSnapshot) {
          const seatData = docSnapshot.data();
          return {
            ...seat,
            empty: !seatData.seat_state, // Update seat's empty state based on Firebase data
          };
        }
        return seat;
      });
      setSeats(updatedSeats);
    } catch (error) {
      console.error('Error fetching seat data:', error);
    }
  };

  useEffect(() => {
    // Fetch seat data on component mount or when refreshSeats is passed in route params
    fetchSeatData();

    // Check if `refreshSeats` is passed, if so, refresh seat data
    if (route.params?.refreshSeats) {
      fetchSeatData();
    }
  }, [route.params?.refreshSeats]);

  // Function to handle seat selection and navigate to BookRegistration
  const onSelectSeat = (seat) => {
    if (!seat.empty) {
      Alert.alert('This seat is already booked');
      return;
    }

    navigation.navigate('BookRegistration', { seatNumber: seat.seatNumber, seatId: seat.seatId });
  };

  // Render individual seat
  const renderSeat = ({ item }) => (
    <TouchableOpacity
      style={styles.seatContainer}
      onPress={() => onSelectSeat(item)}
      disabled={!item.empty}
    >
      <View style={styles.seatWrapper}>
        <Image
          source={require('../../../assets/imgs/car.png')}
          style={[
            styles.seatImage,
            item.empty ? styles.emptySeat : styles.bookedSeat,
          ]}
        />
        <Text style={styles.seatNumber}>{item.seatNumber}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.seatGrid}>
        <FlatList
          data={seats}
          renderItem={renderSeat}
          keyExtractor={(item) => item.seatId.toString()}
          numColumns={5}
          columnWrapperStyle={styles.columnWrapper}
        />
      </View>
      <Image
        source={require('../../../assets/imgs/bus.png.jpg')}
        style={styles.busImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  seatGrid: {
    width: '70%',
    height: '70%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#8e8e8e',
    padding: 10,
  },
  seatContainer: {
    margin: 5,
    alignItems: 'center',
  },
  seatWrapper: {
    alignItems: 'center',
  },
  seatImage: {
    width: 24,
    height: 24,
  },
  seatNumber: {
    marginTop: 2,
    fontSize: 12,
    color: '#000',
  },
  emptySeat: {
    tintColor: 'black',
  },
  bookedSeat: {
    tintColor: '#8e8e8e',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  busImage: {
    width: 24,
    height: 24,
    alignSelf: 'flex-end',
    margin: 10,
    opacity: 0.5,
    position: 'absolute',
    right: 20,
    top: 20,
  },
});

export default BookSeats;
