/* eslint-disable prettier/prettier */
import {
  useState,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import Subscription from "./components/Subscription";
import ConversationDetail from "./components/ConversationDetail";

const AuthContext = createContext<{
  session: {
    token: string,
    ghost_number?: string;
    trial_expires_at?: string;
  } | null,
  setSession: Dispatch<SetStateAction<{
    token: string,
    ghost_number?: string,
    trial_expires_at?: string,
  } | null>>
} | null>(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

function App() {
  const [session, setSession] = useState<{
    token: string,
    ghost_number?: string,
    trial_expires_at?: string,
  } | null>(null);

  console.log("App rendering, session:", session);

  return (
    <div className="App" style={{ minHeight: "100vh", padding: "20px" }}>
      <AuthContext.Provider value={{ session, setSession }}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={!session ? <Home /> : <Navigate to="/dashboard" />}
            />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={session ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/settings"
              element={session ? <Settings /> : <Navigate to="/login" />}
            />
            <Route
              path="/subscription"
              element={session ? <Subscription /> : <Navigate to="/login" />}
            />
            <Route
              path="/conversations/:conversationId"
              element={
                session ? <ConversationDetail /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
