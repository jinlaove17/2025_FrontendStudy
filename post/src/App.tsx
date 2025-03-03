import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/common/Layout";
import PostPage from "./pages/PostPage";
import PostList from "./components/post/PostList";
import PostDetail from "./components/post/PostDetail";

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
            path="posts"
            element={<PostPage />}
          >
            <Route
              index
              element={<PostList />}
            />
            <Route
              path=":id"
              element={<PostDetail />}
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
