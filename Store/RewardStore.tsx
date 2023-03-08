import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext } from "react";
import { context } from "../Context/createContext";
import { ActionType } from "../index.type";
import firestore from "@react-native-firebase/firestore";
function RewardAsyncStore() {

    const { state, dispatch } = useContext(context)

    const setRewardPoint = ({ rewardPoint }: { rewardPoint: number }) => {
        // console.log(state)
        try {
            console.log("Reward P", rewardPoint)
            console.log(state.userId);
            const totalRewardPoint = state?.rewardPoint + rewardPoint
            firestore().collection("reward").doc(state.userId).update({ data: { userId: state.userId, rewardPoint: totalRewardPoint } });
            AsyncStorage.setItem("RewardPoint", JSON.stringify((totalRewardPoint)), (err) => console.debug("err", err))
            dispatch({ type: ActionType.ADD_REWARD, payload: rewardPoint });
        } catch (error) {
            console.log("Set RD P E", error)
        }
    }



    const removeRewardPoint = ({ rewardPoint }: { rewardPoint: number }) => {
        console.log("REward", rewardPoint);
        const totalRewardPoint = state?.rewardPoint + rewardPoint
        firestore().collection("reward").doc(state.userId).update({ data: { userId: state.userId, rewardPoint: totalRewardPoint } });
        AsyncStorage.setItem("RewardPoint", JSON.stringify(rewardPoint))
        dispatch({ type: ActionType.SUB_REWARD, payload: rewardPoint })
    }


    const initRewardPoint = () => {
        console.log("initCall");
        try {

            firestore().collection("reward").doc(state.userId).get({ source: 'server' }).then(documentSnapshot => {
                if (documentSnapshot.exists) {
                    const { rewardPoint } = documentSnapshot.data()?.data;
                    console.log("RDP", rewardPoint)
                    dispatch({ type: ActionType.INIT, payload: rewardPoint });
                }
            });

        } catch (error) {
            console.log("Init error", error);
        }


    }

    return { setRewardPoint, removeRewardPoint, initRewardPoint }

}

export default RewardAsyncStore