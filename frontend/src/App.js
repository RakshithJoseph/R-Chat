import "./App.css";
import { Route } from "react-router-dom";

import Homepg from "./pages/Homepg";
import Chatpg from "./pages/Chatpg";
function App() {
  return (
    <div className="Home">
      <Route path="/" component={Homepg} exact></Route>
      <Route path="/chats" component={Chatpg}></Route>
    </div>
  );
}

export default App;
