import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import apiRoutes from "@/services/routes";
import Form from "@/templates/User/form";
import axios from "axios";

const UserFormEdit = (props) => <Form {...props} />;

export default UserFormEdit;