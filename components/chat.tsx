import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
// import Icon from 'react-native-vector-icons/MaterialIcons'
// import Icon from 

const Icon = require('../assets/img/icon.png')
// import mobileAds from 'react-native-google-mobile-ads';

// # App Open
// AppOpenAd.createForAdRequest(TestIds.APP_OPEN);

// # Interstitial
// InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL);

// # Rewarded
// RewardedAd.createForAdRequest(TestIds.REWARDED);

// # Banners

type item = {
    role: string,
    content: string
}

const Chat = ({ item, index, user }: { item: item, index: number, user: string }) => {

    // mobileAds()
    // .initialize()
    // .then(adapterStatuses => {
    //     console.log(adapterStatuses)
    //     // Initialization complete!
    // });
    return (

        <View key={index} style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start', margin: 5 }}>

            {
                item.role !== "user" ? (
                    <Image source={Icon} style={styles.imgStyle} />
                )
                    : (
                        <Text style={styles.userCard}>{user}</Text>
                    )
            }
            {
                item.role !== "user" ? (
                    <Text selectable style={styles.message}>{item.content}</Text>

                ) : (
                    <Text selectable style={[styles.message, styles.botMessage]}>{item.content}</Text>
                )
            }



        </View >
    )
}

const styles = StyleSheet.create({
    message: {
        padding: 10,
        backgroundColor: '#1f2937',
        color: '#F4EFF4',
        margin: 10,
        borderRadius: 5,
        width: '79%',
        fontSize: 15
    },
    imgStyle: {
        width: 40,
        height: 40
    },
    userCard: {
        color: 'white',
        padding: 10,
        fontSize: 10,
        backgroundColor: '#0f172a',
        borderRadius: 7
    },
    botMessage: {
        backgroundColor: '#374151',
    }
})

export default Chat