import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import AuthNavigator from "./AuthNavigator";
import TechnicianNavigator from "./TechnicianNavigator";
import UserNavigator from "./UserNavigator";

export default function RootNavigator() {

    const { user } = useContext(AuthContext);

    if (!user) {
        return <AuthNavigator />;
    }

    if (user.role === "technician") {
        return <TechnicianNavigator />;
    }

    return <UserNavigator />;

}