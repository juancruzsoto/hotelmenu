import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { authe } from "./firebase";

function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    authe().onAuthStateChanged(async (user) => {
      if (user) {
        setAuth(true);
      } else {
        setAuth(false);
      }
    });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            auth ? <HomeView setAuth={setAuth} /> : <Navigate to="/login" />
          }
        />
        <Route
          exact
          path="/login"
          element={auth ? <Navigate to="/" /> : <LoginView setAuth={setAuth} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
