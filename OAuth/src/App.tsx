import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import KakaoLogin from "./components/KakaoLogin";

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
        <Route
          path="/oauth/kakao"
          element={<KakaoLogin />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
