const Initial_State={
    currentUser: null,
    currentPhone: null,
    currentAddress: null
}

const userReducer=(state=Initial_State,action)=>{
    switch(action.type){
        case 'SET_USER':
            return{
                ...state,
                currentUser: action.payload
            }
        case 'SET_PHONE':
            return {
                ...state,
                currentPhone: action.payload
            }
        case 'SET_DELIVERY_ADDRESS':
            return {
                ...state,
                currentAddress: action.payload
            }
        default:
            return state
    }
}
export default userReducer