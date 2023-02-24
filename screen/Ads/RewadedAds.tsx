
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { AdEventType, RewardedAd, RewardedAdEventType, RewardedAdReward, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
});

import { context } from '../../Context/createContext';
import { ActionType } from '../../index.type';
import RewardAsyncStore from '../../Store/RewardStore';

function RewardedAds({ navigation }: { navigation: any }) {
    const { dispatch } = useContext(context);
    const { setRewardPoint } = RewardAsyncStore()

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            (reward: RewardedAdReward) => {
                console.log('User earned reward of ', reward);
                setRewardPoint({ rewardPoint: +reward?.amount })
                // dispatch({ type: ActionType.ADD_REWARD, payload: +reward?.amount })
            },
        );

        // Start loading the rewarded ad straight away
        rewarded.load();

        // Unsubscribe from events on unmount
        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, []);

    useEffect(() => {
        loaded && rewarded.show();
    }, [loaded])

    rewarded.addAdEventListener(AdEventType.CLOSED, () => {
        navigation.navigate("Home");
        // navigation.popToTop()
    })



    // No advert ready to show yet
    if (!loaded) {
        return null;
    }


    return (
        <></>
    );
}

export default RewardedAds

