import React, { PropsWithChildren } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'


type onPressFunction = {
    pressFn: (e: any) => any,
    btnText: string
}


function Button({ pressFn, btnText }: onPressFunction) {
    return (
        <View style={style.buttonStyle}>
            <TouchableOpacity onPress={pressFn} style={style.button}>
                <Text style={style.text}>{btnText}</Text>
            </TouchableOpacity>
        </View>
    )
}


const style = StyleSheet.create({
    buttonStyle: {
        marginTop: 15,
        padding: 2
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
})

export default Button