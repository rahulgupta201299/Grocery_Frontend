const Initial_State={
    currentClick: false,
    currentSearch: null
}

const clickReducer=(state=Initial_State,action)=>{
    switch(action.type){
        case 'SET_CLICK':
            return{
                ...state,
                currentClick: action.payload
            }
        case 'SET_SEARCH':
            return{
                ...state,
                currentSearch: action.payload
            }
        default:
            return state
    }
}
export default clickReducer