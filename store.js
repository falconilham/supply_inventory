import React, { createContext, useReducer } from 'react';

const initialState = []
const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case 'add Data':
                const result = [...state, ...action.payload]
                return result
            case 'change Data':
                return action.payload
            default:
                throw new Error();
        };
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }