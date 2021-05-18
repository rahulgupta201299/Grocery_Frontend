const Initial_State={
    currentClick: false
}

const clickReducer=(state=Initial_State,action)=>{
    switch(action.type){
        case 'SET_CLICK':
            return{
                ...state,
                currentClick: action.payload
            }
        default:
            return state
    }
}
export default clickReducer