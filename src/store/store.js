import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import logger from 'redux-logger';
import storage from 'redux-persist/es/storage';

import { RootReducer } from './root-reducer';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['userReducer']
}
const persistedReducer = persistReducer(persistConfig, RootReducer);

const middleWares = [logger];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);