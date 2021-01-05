import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import JwtDecode from "jwt-decode";
import AuthRoute from "./util/AuthRoute";
import { Provider } from "react-redux";
import store from "./redux/store";
import { logoutUser, getUserData } from "./redux/actions/userActions";
import { SET_AUTHENTICATED } from "./redux/types";
import Axios from "axios";
import Navbar from "./components/layout/Navbar";
import user from "./pages/user";

Axios.defaults.baseURL =
  "https://europe-west1-socialapp-2c604.cloudfunctions.net/api";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#1A659E",
      main: "#164e87",
      dark: "#164e87",
      contrastText: "#fff",
    },
    secondary: {
      light: "#FF5714",
      main: "#FF5714",
      dark: "#FF5714",
      contrastText: "#fff",
    },
  },
});

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = JwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    Axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store={store}>
          <BrowserRouter>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/user/:handle" component={user} />
                <Route
                  exact
                  path="/user/:handle/scream/:screamId"
                  component={user}
                />
              </Switch>
            </div>
          </BrowserRouter>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default App;
