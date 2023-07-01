import React, { useState, useRef, useCallback, useEffect, useId, useContext } from 'react'
import { TextInput, View, StyleSheet, Alert, Text, ScrollView, FlatList, GestureResponderEvent, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { getAnswer } from '../../API/modles/fetchAnswer';
import Chat from '../../components/chat';
import { BannerAd, TestIds, BannerAdSize } from 'react-native-google-mobile-ads';
import { NavigationAction } from '@react-navigation/native';
import RewardAsyncStore from '../../Store/RewardStore';
import { context } from '../../Context/createContext';
import TostAlert from '../../Alert/Alert';

type responce = {
    role: string,
    content: string
}
type chatMessage = { item: { role: string, content: string }, index: number }

function ChatHome({ navigation }: { navigation: NavigationAction }) {
    const { state } = useContext(context)
    const { removeRewardPoint } = RewardAsyncStore()
    const [userMessage, setUserMessage] = useState<responce[]>();
    const [message, setMessage] = useState<string>('');
    const [response, setResponse] = useState<responce>({ role: '', content: '' });
    const { alertCenter } = TostAlert()



    async function getAns(q: string) {
        if (typeof message === 'string') {
            const query = q.trim();
            const data: any = await getAnswer({ question: query });
            if (data) {
                let msg = data?.choices[0]?.message
                msg && setResponse(msg);
            }
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
        setMessage(data)
    }

    function sendMessage() {
        const question = { role: 'user', content: message }
        if (message?.length > 2) {
            if (state.rewardPoint <= (message.length / 2)) {
                alertCenter({ message: "Your Reward Point is Low, Earn or Buy the Coin" })
                return
            } else {
                removeRewardPoint({ rewardPoint: Math.round(message.length / 2) });
            }
            setUserMessage(prev => {
                if (typeof prev === 'object' && typeof message === 'string')
                    return [...prev, question]
                return []
            }
            )
            if (typeof message == 'string') {
                getAns(message)
                setMessage("")
            }
        }
    }
    const scrollRef = useRef<any>(null);

    const handleContentSizeChange = () => {
        scrollRef.current.scrollToEnd({ animated: true });
    };

    const textStyle = StyleSheet.create({
        textInput: {
            width: '80%',

            marginBottom: 5,
            padding: 12,
            borderRadius: 7,
            backgroundColor: 'white',
            fontSize: 15,
            borderColor: '#E5E6E9',
            borderWidth: 2


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
                renderItem={({ item, index }: chatMessage) => <Chat item={item} index={index} user={state.SortName} />}
                style={{ backgroundColor: '#FFFFFF' }}
            />

            <View style={style.root} >
                <View style={style.messageBox}>
                    <TextInput value={message} focusable placeholder='Enter Any Question' placeholderTextColor={'gray'} onChangeText={setInputMessage} style={textStyle.textInput} />
                    <TouchableOpacity activeOpacity={0.4} style={style.sendButton}
                        onPress={sendMessage}
                    >
                        <Icon
                            name='send'
                            size={30}
                            color={'#ffffff'}
                        >
                        </Icon>
                    </TouchableOpacity>


                </View>
            </View>
        </>
    )

}

const style = StyleSheet.create({
    root: {
        display: 'flex',
        height: '14%',
        backgroundColor: '#FFFFFF',
        flexDirection: 'column-reverse',
    },
    messageBox: {
        display: "flex",
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
        alignItems: 'center',


    },
    sendButton: {
        marginVertical: 5,
        paddingHorizontal: 14,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: '#111827',
        color: '#ffffff'
    }
})





export default ChatHome