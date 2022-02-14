import "./App.css";
import { BrowserRouter as Router, Routes,Route,Navigate } from "react-router-dom";
import LoginView from "./views/LoginView";
import HomeView from "./views/HomeView";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from "react";

function App() {

  const [auth, setAuth] = useState(false);

useEffect(() => {
  const loggedUser = localStorage.getItem("token")
  if (loggedUser==="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJjaGFsbGVuZ2VAYWxrZW15Lm9yZyIsImlhdCI6MTUxNjIzOTAyMn0.ilhFPrG0y7olRHifbjvcMOlH7q2YwlegT0f4aSbryBE"){
    setAuth(true)
  }
  else {
    setAuth(false)
  }

}, [])




  return (
    <Router>
      <Routes>
      <Route exact path="/" element={auth ? <HomeView setAuth={setAuth} /> :  <Navigate to="/login"/>} />
      <Route exact path="/login" element={auth ?<Navigate to="/"/> : <LoginView setAuth={setAuth} />} />
      </Routes>
    </Router>
  );
}

export default App;
