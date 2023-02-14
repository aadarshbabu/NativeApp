import React, { useState, useRef, useCallback, useEffect, useId } from 'react'
import { TextInput, View, StyleSheet, Alert, Text, ScrollView, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { getAnswer } from '../../API/fetchAnswer';
import Chat from '../../components/chat';
import { BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';


type res = {
    choices: object[]
}

function HomePage({ route }: { route: any }) {

    const { userName }: { userName: string } = route.params;
    console.log("USERNAME", userName)
    const name = userName.split(" ")
    const sortName = name[0][0] + name[1][0] // geting Array 0th element of the array and element 0th location char.

    const [userMessage, setUserMessage] = useState<string[]>(["this is for test message"]);
    const [message, setMessage] = useState<string | undefined>();
    const [response, setResponse] = useState<res[] | any>();

    async function getAns(q: string) {
        if (typeof message === 'string') {
            const data: any = await getAnswer({ question: q });
            let msg = data?.choices[0]?.text
            setResponse(msg);
        }
    };

    useEffect(() => {
        setUserMessage(prev => {
            if (typeof prev === 'object' && typeof message === 'string')
                return [...prev, response]
            return []
        })

    }, [response])

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
        if (typeof message == 'string')
            getAns(message)
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
            padding: 10,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 20,
            backgroundColor: 'white',
            fontSize: 15
        },
    })


    return (
        <>
            <BannerAd
                unitId={TestIds.BANNER}
                size={BannerAdSize.FULL_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
            />
            <FlatList
                ref={scrollRef}
                onContentSizeChange={handleContentSizeChange}
                data={userMessage}
                renderItem={({ item, index }) => <Chat item={item} index={index} user={sortName} />}
                style={{ backgroundColor: '#758283' }}
            />


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
        backgroundColor: '#758283',
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