import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SignedInStack, SignedOutStack } from "./Navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      userHandler(user);
    });
  }, []);

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
