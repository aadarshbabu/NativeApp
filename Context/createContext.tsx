import React, { createContext, Dispatch } from 'react';

import { Store, store } from './store';

interface Action {
    payload: string | number,
    type: string
}
export type contextInit = {
    state: Store
    dispatch: Dispatch<Action>
}

export const context = createContext<contextInit>({ state: store, dispatch: (Action: Action) => { } })