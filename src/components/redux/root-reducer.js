import {combineReducers} from 'redux'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import cartReducer from '../redux/cart/cart-reducer'
import userReducer from '../redux/user/user-reducer'
import clickReducer from '../redux/click/click-reducer'
const persistConfig={
    key: 'root',
    storage,
    blacklist: ['click'] ,
    whitelist: ['cart','user']
}

const rootReducer = combineReducers({
    cart: cartReducer,
    click: clickReducer,
    user: userReducer,
})

export default persistReducer(persistConfig,rootReducer)