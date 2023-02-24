import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { InterstitialAd, AdEventType, TestIds, RewardedAd } from 'react-native-google-mobile-ads';
import { NavigationAction } from '@react-navigation/native';

const adUnitId = true ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

function IntrestrialAds({ navigation }: { navigation: any }) {
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });

        // Start loading the interstitial straight away
        interstitial.load();

        // Unsubscribe from events on unmount
        return unsubscribe;
    }, []);

    useEffect(() => {

        loaded && interstitial.show();

    }, [loaded])

    interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        navigation.navigate("RewardedAds");
    });
    interstitial.addAdEventListener(AdEventType.ERROR, (e: Error) => {
        console.log("error", e);
        navigation.navigate("Home");
    })

    return (
        <></>
    )
}

export default IntrestrialAds

const styles = StyleSheet.create({})