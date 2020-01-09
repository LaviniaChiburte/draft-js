import React from "react";
import EditorV1 from "./components/EditorV1";
import EditorV2 from "./components/EditorV2";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import "./layouts/App.css";
import "./layouts/Draft.css";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/editorV1">
          <EditorV1 />
        </Route>

        <Route path="/editorV2">
          <EditorV2 />
        </Route>
        <Redirect to="/editorV1" />
      </Switch>
    </Router>
  );
}

export default App;
