import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginForm />}
        />
        <Route
          path="/signup"
          element={<SignUpForm />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
