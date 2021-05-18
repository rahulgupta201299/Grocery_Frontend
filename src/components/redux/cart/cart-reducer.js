const Initial_State={
    currentCart: null,
    currentCartItem: null
}

const userReducer=(state=Initial_State,action)=>{
    switch(action.type){
        case 'SET_CART':
            return{
                ...state,
                currentCart: action.payload
            }
        case 'SET_CART_ITEM':
            return{
                ...state,
                currentCartItem: action.payload
            }
        default:
            return state
    }
}
export default userReducer