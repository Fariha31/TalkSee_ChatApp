export const initialState=null;
export const reducer = (state,action)=>{
    switch (action.type) {
    case  "USER":
        return action.payload
    
    case "FRIEND_REQUESTED":
        return {
            ...state,
            sentRequests:action.payload.sentRequests
        }
    
    default:
        return state
} 
}