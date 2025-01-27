import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/utils/PrivateRoute"
import BubblePage from "./components/BubblePage"
import Login from "./components/Login";
import "./styles.scss";
import { getToken } from "./components/utils/axiosWithAuth";

function App() {
  
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute exact path="/BubblePage" component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
