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
            firestore().collection("reward").doc(state.userId).update({ data: { userId: state.userId, rewardPoint: state.rewardPoint } });
            AsyncStorage.setItem("RewardPoint", JSON.stringify((state?.rewardPoint + rewardPoint)), (err) => console.debug("err", err))
            dispatch({ type: ActionType.ADD_REWARD, payload: rewardPoint });
        } catch (error) {
            console.log("Set RD P E", error)
        }
    }



    const removeRewardPoint = ({ rewardPoint }: { rewardPoint: number }) => {
        AsyncStorage.setItem("RewardPoint", JSON.stringify(rewardPoint))
        dispatch({ type: ActionType.SUB_REWARD, payload: rewardPoint })
    }


    const initRewardPoint = () => {
        console.log("initCall");
        try {
            AsyncStorage.getItem("RewardPoint", (err, res) => {
                if (err) {
                    console.log("Error Happen in Reward Init", err.message, err.name, err.stack)
                    return false
                }
                if (res || !res) {
                    console.log("Res", res)
                    firestore().collection("reward").doc(state.userId).get({ source: 'server' }).then(documentSnapshot => {
                        if (documentSnapshot.exists) {
                            const { rewardPoint } = documentSnapshot.data()?.data;
                            console.log("RDP", rewardPoint)
                            dispatch({ type: ActionType.INIT, payload: rewardPoint });
                        }
                    });

                    return true
                }

            })
        } catch (error) {
            console.log("Init error", error);
        }


    }

    return { setRewardPoint, removeRewardPoint, initRewardPoint }

}

export default RewardAsyncStore