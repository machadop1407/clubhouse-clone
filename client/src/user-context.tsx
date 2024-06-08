// src/contexts/UserContext.tsx

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  FC,
  useEffect,
} from "react";
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  User as StreamUserType,
  Call,
} from "@stream-io/video-react-sdk";
import Cookies from "universal-cookie";

interface User {
  username: string;
  name: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  client: StreamVideoClient | undefined;
  setClient: React.Dispatch<
    React.SetStateAction<StreamVideoClient | undefined>
  >;
  call: Call | undefined;
  setCall: React.Dispatch<React.SetStateAction<Call | undefined>>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = (props) => {
  const [user, setUser] = useState<User | null>(null);
  const [client, setClient] = useState<StreamVideoClient>();
  const [call, setCall] = useState<Call>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const cookies = new Cookies(null, { path: "/" });

  useEffect(() => {
    const token = cookies.get("token");
    const username = cookies.get("username");
    const name = cookies.get("name");

    if (!token || !username || !name) {
      setIsLoading(false);
      return;
    }
    const user: StreamUserType = {
      id: username,
      name: name,
    };

    const myClient = new StreamVideoClient({
      apiKey: import.meta.env.VITE_API_KEY,
      user,
      token,
    });

    setUser({ username, name });
    setClient(myClient);
    setIsLoading(false);
    return () => {
      myClient.disconnectUser();
      setClient(undefined);
      setUser(null);
    };
  }, []);

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoading, client, setClient, call, setCall }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
