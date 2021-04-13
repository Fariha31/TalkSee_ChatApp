import React, { createContext, useReducer, useEffect } from "react";
import { reducer,initialState } from "../reducers/userReducer";
 

export const UserContext = createContext();
const UserContextProvider = (props) => {
   const [state,dispatch] = useReducer(reducer,initialState);
   
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user)
           dispatch({type:"USER",payload:user})
  },[])

  return (
    <UserContext.Provider value={{state,dispatch}}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;