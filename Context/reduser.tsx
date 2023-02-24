import { Store, store } from "./store";
import { ActionType } from "../index.type";


type Action = {
    type: string,
    payload: number | string
}

export function reduser(state: Store, action: Action): Store {

    const { type, payload } = action;
    console.log("payload", payload);
    switch (type) {
        case ActionType.INIT:
            if (typeof payload == 'number')
                return { ...state, rewardPoint: payload }
        case ActionType.ADD_REWARD:
            if (typeof action.payload === 'number')
                return { ...state, rewardPoint: state.rewardPoint + action.payload }
            break;
        case ActionType.SUB_REWARD:
            if (typeof payload === 'number')
                return { ...state, rewardPoint: state.rewardPoint - payload };
            break;
        case ActionType.SORT_NAME:
            if (typeof payload === 'string')
                return { ...state, SortName: payload }
            break;
        case ActionType.ADD_USER_ID:
            if (typeof payload === 'string')
                return { ...state, userId: payload }
        default:
            return state
    }
    return state
}