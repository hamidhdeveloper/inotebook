import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import About from "./components/About";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import NoteState from "./context/notes/NoteState";


function App() {
  return (
    <>
      <NoteState>
      <Router>
        <NavBar />
        <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
        </div>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
