import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/layout/header";
import Sidebar from "./components/layout/sidebar";

import Dashboard from "./components/dashboard";
import CreateAccount from "./components/create-account";
import LoginPage from "./components/log-in";
import Users from "./components/users";
import UserEditDelete from "./components/userupdate";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex" id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/log-in" element={<LoginPage />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userupdate/:_id" element={<UserEditDelete />} />
            {/* <Route path="/users" element={<Users />} /> */}
          </Routes>
        </div>

      </div>


    </BrowserRouter>
  );
}

export default App;
