import React, { use } from "react";
import { AuthContext } from "../../Context/AuthContext";

const AuthHook = () => {
  const authInfo = use(AuthContext);
  return authInfo;
};

export default AuthHook;
