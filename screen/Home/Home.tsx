import { View, Text, StyleSheet, Pressable, GestureResponderEvent } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TouchableOpacity } from 'react-native'
import RewarePurchase from '../Purchase/RewarePurchase'
import { useIsFocused } from '@react-navigation/native';
import RewardAsyncStore from '../../Store/RewardStore'
import {
    RewardedInterstitialAd,
    RewardedAdEventType,
    TestIds,
    AdEventType,
} from 'react-native-google-mobile-ads';
import { context } from '../../Context/createContext'
import { ActionType } from '../../index.type'


const adUnitId = __DEV__
    ? TestIds.REWARDED_INTERSTITIAL
    : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

const HomeButton = ({ pressFn, btnText }: { pressFn: (e: any) => any, btnText: string }) => {

    return (
        <TouchableOpacity activeOpacity={0.4} onPress={pressFn} style={styles.button}>
            <Text style={styles.text}>{btnText}</Text>
        </TouchableOpacity>
    )
}



function Home({ navigation }: { navigation: any }) {

    const { initRewardPoint } = RewardAsyncStore();

    useEffect(() => {
        initRewardPoint()
    }, [])

    const { state, dispatch } = useContext(context);
    console.log(state);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
            RewardedAdEventType.LOADED,
            () => {
                setLoaded(true);
            },
        );
        const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
                console.log('User earned reward of ', reward);
            },
        );

        // Start loading the rewarded interstitial ad straight away
        rewardedInterstitial.load();

        // Unsubscribe from events on unmount
        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    });

    rewardedInterstitial.addAdEventListener(AdEventType.CLOSED, () => {
        setLoaded(false);
    });
    rewardedInterstitial.addAdEventListener(AdEventType.ERROR, (err) => {
        console.debug("rewardedInterstitial Ad err", err)
        setLoaded(false);
    })

    function openAdd(e: any) {
        navigation.navigate("IntrestrialAds");
    }
    const openRewardPuschase = () => {
        navigation.navigate("RewarePurchase")
    }


    function chatGpt(e: any) {
        if (loaded)
            rewardedInterstitial.show();

        navigation.navigate("ChatHome")
    }

    function goBack(event: GestureResponderEvent): void {
        navigation.goBack();
    }

    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <Icon name='arrow-back' size={17} color={"#1e392b"} onPress={goBack} style={styles.headerIcon} />
                    <Text style={styles.headerText}>Home</Text>
                </View>
                <View style={styles.headerRight}>
                    <View style={styles.reware}>
                        <Text style={{ color: '#ffffff', fontSize: 10, padding: 5 }}>{state?.rewardPoint}</Text>
                    </View>
                    <View style={styles.avatar}>
                        <Text style={{ color: '#f3f1f2' }}>{state?.SortName}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.main}>
                <HomeButton pressFn={chatGpt} btnText='Chat GPT' />
                <HomeButton pressFn={openAdd} btnText='Earn Credit' />
                <HomeButton pressFn={openRewardPuschase} btnText='Buy Credit' />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        // backgroundColor: "f1f2f3"
    },
    header: {
        width: '100%',
        height: '7%',
        elevation: 1,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#171717',
        shadowOffset: { width: 10, height: 6 },
        shadowOpacity: 3,
        shadowRadius: 9,

    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerRight: {
        display: "flex",
        flexDirection: 'row-reverse'
    },
    headerIcon: {
        fontSize: 30,
        paddingHorizontal: 5
    },
    headerText: {
        color: "#1e392b",
        fontSize: 30,
        fontWeight: "bold",
        paddingHorizontal: 9,
        paddingVertical: 7
    },
    main: {
        width: '100%',
        height: '94%',
        backgroundColor: '#EFEEFB',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    button: {
        backgroundColor: '#0f172A',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 7,
        elevation: 3,
        width: '90%',
        margin: 5,
        shadowColor: 'red',
        shadowOffset: {
            width: 2,
            height: 7
        },
        shadowRadius: 2,
        shadowOpacity: 4
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 47 / 2,
        backgroundColor: '#212112',
        marginRight: -12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'

    },
    reware: {
        minWidth: 20,
        maxHeight: 20,
        borderRadius: 20 / 2,
        backgroundColor: '#e10000',
        marginRight: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 4,

    }
})

export default Home