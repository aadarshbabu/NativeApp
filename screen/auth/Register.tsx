import React, { useState, Dispatch } from 'react';
import { View, Text, StyleSheet, Image, TextInput, GestureResponderEvent } from 'react-native';
import img from "../../assets/img/img.jpg"
import Button from '../../components/Button';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';
import Alert from '../../Alert/Alert';
function Register({ navigation }: { navigation: any }) {

  type UserData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
  }

  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: "",
    email: '',
    password: ''
  })

  // Login Function
  function test(e: GestureResponderEvent) {
    firestore().collection("users").add(userData); // Add the data from a firebase.
    auth().createUserWithEmailAndPassword(userData.email, userData.password).then(() => {
      console.log("user is created");
      Alert();
    })
      .catch((err) => {
        console.log(err.message)
      })
    console.log("Function Call")
  }

  function SetStateHandler(data: string, name: string) {
    setUserData((prevState: UserData) => {
      return {
        ...prevState,
        [name]: data,
      }
    })
  }
  console.log(userData)

  return (

    <View style={style.loginPage}>
      <Image source={img} style={style.imgEffect} />
      <View style={style.userInput}>
        <KeyboardAwareScrollView>
          <Text style={style.text} > REGISTER </Text>

          <TextInput style={style.textInput} value={userData.firstName}
            onChangeText={(e) => SetStateHandler(e, 'firstName')}
            placeholder='First Name'></TextInput>

          <TextInput style={style.textInput} placeholder='Last Name'
            value={userData.lastName}
            onChangeText={(e) => SetStateHandler(e, 'lastName')}
          ></TextInput>

          <TextInput style={style.textInput}
            keyboardType={'email-address'}
            placeholder='Enter a Email'
            value={userData.email}
            onChangeText={(e) => SetStateHandler(e, 'email')}
          ></TextInput>

          <TextInput style={style.textInput} secureTextEntry={true} placeholder='Enter a Password'
            value={userData.password}
            onChangeText={(e) => SetStateHandler(e, 'password')}
          ></TextInput>

          <Button pressFn={test} btnText={"Register Now"} />

          <Text style={[style.text, style.loginRedirect]} >
            Already Register Click Hear
            <Text style={{ color: 'blue' }}
              onPress={() => navigation.navigate("Login")}
            > Login</Text>
          </Text>

        </KeyboardAwareScrollView>
      </View>

    </View>

  );
}


const style = StyleSheet.create({
  loginPage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    borderColor: 'red',
    // borderWidth: 3,
  },
  imgEffect: {
    width: '100%', height: '25%',
    borderBottomRightRadius: 130,
    borderBottomLeftRadius: 10,
  },
  userInput: {
    margin: 40,
    width: '95%',
    height: '60%',


  },
  textInput: {
    width: '100%',
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: 'black',
    marginBottom: 5
  },
  text: {
    fontSize: 25, textAlign: 'center', padding: 10, color: '#992424'
  },
  loginRedirect: {
    fontSize: 15

  }


})



export default Register;
