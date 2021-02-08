import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./Header";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import notFound from "./notFound";
const App = () => {
  return (
    
      <BrowserRouter>
        
        <Switch>
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/notfound" component={notFound} />
          <Redirect to="/notfound" />
        </Switch>
      </BrowserRouter>
   
  );
};

export default App;
