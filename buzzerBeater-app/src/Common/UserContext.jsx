import React, { createContext, useState } from 'react';

const initialUserState = {
  name: 'testContext',
  height: -1.0,
  position: 'test contextpositon'
};

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUserState);

  const setUserData = (newUserData) => {
    setUser(newUserData);
  };

  const value = { user, setUserData };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const UserConsumer = UserContext.Consumer;

export { UserProvider, UserConsumer, UserContext };
