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


const Chat = ({ item, index, user }: { item: string, index: number, user: string }) => {
    // mobileAds()
    // .initialize()
    // .then(adapterStatuses => {
    //     console.log(adapterStatuses)
    //     // Initialization complete!
    // });
    return (

        <View style={{ display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start', margin: 5 }}>
            {index % 2 === 0 ? (
                <Text style={styles.userCard}>{user}</Text>
            )
                : (
                    <Image source={Icon} style={styles.imgStyle} />
                )
            }
            <Text style={styles.message}>{item}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    message: {
        padding: 10,
        backgroundColor: 'white',
        color: 'black',
        margin: 10,
        borderRadius: 5,
        width: '79%'
    },
    imgStyle: {
        width: 40,
        height: 40
    },
    userCard: {
        color: 'white',
        padding: 10,
        fontSize: 10,
        backgroundColor: 'blue',
        borderRadius: 7
    }
})

export default Chat