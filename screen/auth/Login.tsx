import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, GestureResponderEvent, Alert } from 'react-native';
import img from "../../assets/img/img.jpg"
import Button from '../../components/Button';
import auth from "@react-native-firebase/auth"
type UserData = {
    email: string,
    password: string
}
function Login({ navigation }: { navigation: any }) {

    const [userData, setUserData] = useState<UserData>({
        email: '',
        password: ''
    })
    function login(e: GestureResponderEvent) {
        if (userData.email.length < 10 || userData.password.length < 5) {
            Alert.alert("Login", "Invalid User Email and password is not Valid.");
        }
        auth().signInWithEmailAndPassword(userData.email, userData.password).then(() => {
            Alert.alert("Login", "Login Success")
            setTimeout(() => {
                navigation.navigate("Home");
            }, 1000)

        }).catch((err) => {
            Alert.alert("Login", "Login Successfull")
            console.error(err.message)
        })

    }
    function SetStateHandler(data: string, name: string) {
        setUserData((prevState: UserData) => {
            return {
                ...prevState,
                [name]: data,
            }
        })
    }

    return (

        <View style={style.loginPage}>
            <Image source={img} style={style.imgEffect} />
            <View style={style.userInput}>
                <Text style={{ fontSize: 25, textAlign: 'center', padding: 10, color: '#992424' }} > Login </Text>
                <TextInput style={style.textInput}
                    keyboardType='email-address'
                    placeholder='Enter a Email'
                    value={userData.email}
                    onChangeText={(e) => SetStateHandler(e, 'email')}
                ></TextInput>
                <TextInput style={style.textInput} secureTextEntry={true} placeholder='Enter a Password'
                    value={userData.password}
                    onChangeText={(e) => SetStateHandler(e, 'password')}
                ></TextInput>
                <Button pressFn={login} btnText={"Login"} />
                <Text style={[style.text, style.loginRedirect]} >
                    Not Register Yet Click hear to
                    <Text style={{ color: 'blue' }}
                        onPress={() => navigation.navigate("Register")}
                    > Register </Text>
                </Text>
            </View>
        </View>

    );
}


const style = StyleSheet.create({
    loginPage: {
        width: '100%',
        height: '100%',
        alignItems: 'center'
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



export default Login;
