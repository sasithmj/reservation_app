import React, { useEffect, useState, useRef } from 'react';
import { Alert, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../../firebase';

const Signup = ({ route }) => {
  const { justRegistered } = route.params || {};
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigation = useNavigation();
  const hasMounted = useRef(false);  // To track the initial mount

  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   if (user && hasMounted.current && !isLoggingIn && !justRegistered) {
    //     navigation.navigate('HomeScreen');
    //   }
    // });

    return () => {
      hasMounted.current = false;  // Clean up on component unmount
      // unsubscribe();
    };
  }, [isLoggingIn, justRegistered]);

  useEffect(() => {
    // Set hasMounted to true after the first render
    hasMounted.current = true;
  }, []);

  const handleLogin = () => {
    setIsLoggingIn(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        navigation.navigate('HomeScreen');
      })
      .catch(error => {
        setIsLoggingIn(false);
        Alert.alert('Login Error', error.message);
      });
  };

  const forgotPassword = () => {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Alert.alert('Password reset email sent');
        })
        .catch(error => {
          Alert.alert('Error', error.message);
        });
    } else {
      Alert.alert('Please enter your email address');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Login Page</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="type the (only) Kdu email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={forgotPassword} style={[styles.button, styles.buttonOutline]}>
          <Text style={styles.buttonOutlineText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'black', // Set the background color to black
    color: 'white', // Change the text color to white for better contrast
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
});



export default Signup;
