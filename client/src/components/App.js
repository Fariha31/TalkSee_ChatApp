import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import userDashboard from "./userDashboard";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import Activate from "./Activate";
import UserRoute from "./userRoutes";
import notFound from "./notFound";
import ForgotPassword from "./forgotPassword";
import ResetPassword from "./resetPassword";
import TalkSeeTitle from "./TalkSeeTitle";
const App = () => {
  return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={TalkSeeTitle} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={LogIn} />
          <Route exact path="/user/activate/:token" component={Activate} />
          <Route exact path="/reset/password/:token" component={ResetPassword} />
          <UserRoute exact path="/dashboard" component={userDashboard} />
          <Route exact path="/forgotPassword" component={ForgotPassword} />
          
          <Route exact path="/notfound" component={notFound} />
          <Redirect to="/notfound" />
        </Switch>
      </BrowserRouter>
   
  );
};

export default App;
