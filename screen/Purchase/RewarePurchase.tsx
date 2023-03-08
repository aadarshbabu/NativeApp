import React, { useContext } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import Button from '../../components/Button'
import AllInOneSDKManager from 'paytm_allinone_react-native';
import { createPayment } from '../../API/modles/iniciatePayment';
import { context } from '../../Context/createContext';
import RewardAsyncStore from '../../Store/RewardStore';


function RewarePurchase({ navigation }: { navigation: any }) {
    const { state } = useContext(context);
    const { setRewardPoint } = RewardAsyncStore();


    const wantIt = async ({ amount, point }: { amount: string, point: number }) => {
        const order = await createPayment({ amount, userId: state.userId });

        if (!order) {
            return Alert.alert("order", "Can't process order");
        }

        AllInOneSDKManager.startTransaction(
            order.orderId,
            order.mid,
            order.tranxToken,
            order.amount,
            order.callbackUrl,
            order.isStaging,
            order.appInvokeRestricted,
            order.urlScheme
        )
            .then((result) => {
                if (result.STATUS === "TXN_SUCCESS") {
                    setRewardPoint({ rewardPoint: point })
                    updateUI(navigation);
                }
            })
            .catch((err) => {
                Alert.alert("Error", "Payment not successfull");
                handleError(err);
            });

    }

    return (
        <View style={style.root}>
            <View style={style.buttonContainer}>
                <Button pressFn={() => wantIt({ amount: '10', point: 1000 })} btnText='Purchase 1000 Point RS 10'></Button>
                <Button pressFn={() => wantIt({ amount: '19', point: 2000 })} btnText='Purchase 2000 Point RS 19'></Button>
                <Button pressFn={() => wantIt({ amount: '28', point: 3000 })} btnText='Purchase 3000 Point RS 28'></Button>
                <Button pressFn={() => wantIt({ amount: '35', point: 4000 })} btnText='Purchase 4000 Point RS 35'></Button>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    root: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonContainer: {
        width: '90%',
        display: 'flex',

    }
})

export default RewarePurchase

function updateUI(navigation: any) {
    navigation.navigate("Home")
}
function handleError(err: any) {
    console.error(err)
}



