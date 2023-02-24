import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import {
    RewardedInterstitialAd,
    RewardedAdEventType,
    TestIds,
    AdEventType,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
    ? TestIds.REWARDED_INTERSTITIAL
    : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

function RewardedInterstitialAdd({ navigation, route }: { navigation: any, route: any }) {

    const { userName }: { userName: string } = route.params;
    console.log("Add Page", userName)
    const [loaded, setLoaded] = useState(false);
    console.log("Route", route);
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
    }, []);

    rewardedInterstitial.addAdEventListener(AdEventType.CLOSED, () => {
        navigation.navigate("ChatHome", {
            userName,
        })
    })

    // No advert ready to show yet
    useEffect(() => {
        if (loaded) {
            rewardedInterstitial.show();
        }
    }, [loaded])


    return (
        <>
            <View>

            </View>
        </>
    );
}

export default RewardedInterstitialAdd
