import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartReducer from '../redux/cart/cart-reducer'
import clickReducer from '../redux/click/click-reducer'
const persistConfig={
    key: 'root',
    storage,
    blacklist: ['click'] ,
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    cart: cartReducer,
    click: clickReducer
})

export default persistReducer(persistConfig,rootReducer)