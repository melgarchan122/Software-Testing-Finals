import Login from "./pages/Login";
import "./App.css";
import { Authprovider } from "./contexts/AuthContext";

function App() {
  return (
    <Authprovider>
      <Login />
    </Authprovider>
  );
}

export default App;
