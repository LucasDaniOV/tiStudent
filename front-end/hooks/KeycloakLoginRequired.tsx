import Keycloak from "keycloak-js";
import { useEffect, useRef, useState } from "react";

const url = process.env.NEXT_PUBLIC_KEYCLOAK_URL;
const realm = process.env.NEXT_PUBLIC_KEYCLOAK_REALM;
const clientId = process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID;

if (!url || !realm || !clientId)
  throw new Error("Keycloak env not set");

const KeycloakLoginRequired = () => {
  const isRun = useRef(false);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    if (isRun.current) return;
    console.log("KeycloakLoginRequired")
    isRun.current = true;

    const keycloak = new Keycloak({ url, realm, clientId });
    keycloak
      .init({
        onLoad: "login-required",
      })
      .then((res) => {
        setLogin(res);
      });
  }, []);

  return isLogin;
};

export default KeycloakLoginRequired;
