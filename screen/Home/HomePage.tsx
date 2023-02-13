import React, { useState, useRef, useCallback } from 'react'
import { TextInput, View, StyleSheet, Alert, Text, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

function HomePage() {

    const [userMessage, setUserMessage] = useState<string[]>([]);
    const [message, setMessage] = useState<string | undefined>();

    const setInputMessage = (data: string) => {
        console.log(data)
        if (data.length > 4) {
            setMessage(data);
            return true
        }
        setMessage(data)
    }

    function sendMessage() {
        setUserMessage(prev => {
            if (typeof prev === 'object' && typeof message === 'string')
                return [...prev, message]
            return []
        }
        )
        setMessage("")
    }
    const scrollRef = useRef<any>(null);

    const handleContentSizeChange = () => {
        scrollRef.current.scrollToEnd({ animated: true });
    };

    const textStyle = StyleSheet.create({
        textInput: {
            width: '80%',
            minWidth: (message && (message?.length > 5 && message.length < 100) ? '80%' : '90%'),
            marginBottom: 5,
            padding: 6,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 20
        },
    })


    return (
        <>
            <ScrollView
                ref={scrollRef}
                onContentSizeChange={handleContentSizeChange}>
                <View style={{ height: '90%', padding: 10 }}>
                    {
                        userMessage?.map((data: string, index: number) => (
                            <View key={index} style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start', marginBottom: 5 }}>
                                <Icon
                                    name='person-pin'
                                    size={36}
                                    color={'#000000'}

                                    onPress={() => Alert.alert('Login with Facebook')}
                                />
                                <Text>{data}</Text>
                            </View>

                        ))

                    }


                    <View style={{ display: 'flex', flexDirection: "row-reverse", alignItems: 'center', justifyContent: 'flex-start', marginTop: 6 }}>
                        <Icon
                            name='person-pin'
                            size={36}
                            color={'#000000'}

                            onPress={() => Alert.alert("test")}
                        />
                        <Text>Test Message</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={style.root} >
                <View style={style.messageBox}>
                    <TextInput value={message} focusable placeholder='Enter Any Question' placeholderTextColor={'gray'} onChangeText={setInputMessage} style={textStyle.textInput} />
                    {
                        message && (message?.length > 5 && message.length < 100) &&

                        <Icon
                            name='send'
                            style={style.sendButton}
                            size={26}
                            color={'#000000'}
                            onPress={sendMessage}
                        >
                        </Icon>
                    }

                </View>
            </View>
        </>
    )

}

const style = StyleSheet.create({
    root: {
        display: 'flex',
        height: '10%',
        backgroundColor: '#f1f2f3',
        flexDirection: 'column-reverse',


    },
    messageBox: {
        display: "flex",

        padding: 3,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',

    },
    sendButton: {
        padding: 8,
        borderRadius: 50,
        backgroundColor: 'green',
        color: '#ffffff'
    }
})





export default HomePage