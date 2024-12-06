import { Route, Routes } from "react-router";
import Main from "./pages/Main";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Main />} />
      </Route>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
      </Route>
    </Routes>
  );
}
