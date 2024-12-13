import { Navigate, Outlet, Route, Routes } from "react-router";
import Main from "./pages/Main";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import Board from "./pages/Board";
import BoardDetail from "./pages/BoardDetail";
import Search from "./pages/Search";
import User from "./pages/User";
import BoardEditor from "./pages/BoardEditor";
import UserEdit from "./pages/UserEdit";
import { useModal } from "./stores/modalStore";
import Modal from "./components/common/Modal";
import { useAuthStore } from "./stores/authStore";

export default function App() {
  const modalOpen = useModal((state) => state.modalOpen);
  const isLogIn = useAuthStore((state) => state.token);

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="board/:id" element={<Board />} />
          <Route path="board/:id/:postId" element={<BoardDetail />} />
          <Route path="search/:query" element={<Search />} />
          <Route path="user/:id" element={<User />} />
          <Route element={isLogIn ? <Outlet /> : <Navigate to="/" replace />}>
            <Route path="board/:id/create" element={<BoardEditor />} />
            <Route path="board/:id/:postId/update" element={<BoardEditor />} />
            <Route path="user/edit" element={<UserEdit />} />
          </Route>
        </Route>
        <Route
          path="auth"
          element={isLogIn ? <Navigate to="/" replace /> : <AuthLayout />}
        >
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      {modalOpen && <Modal />}
    </>
  );
}
