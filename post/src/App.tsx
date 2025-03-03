import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PostPage from "./pages/PostPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={null}
          />
          <Route
            path="/posts"
            element={<PostPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
