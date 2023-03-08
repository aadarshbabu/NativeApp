import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, GestureResponderEvent, Alert } from 'react-native';
import img from "../../assets/img/img.jpg"
import Button from '../../components/Button';
import auth from "@react-native-firebase/auth"
import { firebase } from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TostAlert from '../../Alert/Alert';
import RewardAsyncStore from '../../Store/RewardStore';
import { context } from '../../Context/createContext';
import { ActionType } from '../../index.type';

type UserData = {
    email: string,
    password: string
}

const createUserSortName = ({ userName }: { userName: string }): string => {
    const name = userName.split(" ")
    let sortName: string
    if (name.length >= 2)
        sortName = name[0][0].toUpperCase() + name[1][0].toUpperCase(); // geting Array 0th element of the array and element 0th location char.
    else {
        sortName = name[0][0].toUpperCase()
    }
    return sortName
}

function Login({ navigation }: { navigation: any }) {

    const { state, dispatch } = useContext(context)

    const { alertTop } = TostAlert();
    const [userData, setUserData] = useState<UserData>({
        email: '',
        password: ''
    })

    function login(e: GestureResponderEvent) {

        if (userData.password.length < 5) {
            alertTop({ message: "password is not valid." })
            return false
        }

        auth().signInWithEmailAndPassword(userData.email, userData.password).then(async (value) => {
            const user = firebase.auth().currentUser;
            try {
                await AsyncStorage.setItem("token", JSON.stringify(value));
                dispatch({ type: ActionType.ADD_USER_ID, payload: value?.user?.uid });

            } catch (error) {
                console.log(error);
            }

            if (user?.displayName) {
                const ST = createUserSortName({ userName: user?.displayName })
                dispatch({ type: ActionType.SORT_NAME, payload: ST });
            }

            alertTop({ message: "Login Successful" })
            setTimeout(() => {
                navigation.navigate("Home");
            }, 1000)

        }).catch((err) => {
            alertTop({ message: "something went wrong" })
            console.error(err.message)
            return false;
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
