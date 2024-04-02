import Layout from "@/components/Layout";
import Login from "@/templates/Login";

const LoginPage = () => <Login />;

LoginPage.authGuard = false;

export default LoginPage;
