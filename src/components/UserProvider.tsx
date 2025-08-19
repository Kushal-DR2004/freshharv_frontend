import { createContext, useState } from "react";
import type { ReactNode } from "react";

interface UserContextType {
  username: string | null;
  setUsername: (name: string) => void;
}

export const UserContext = createContext<UserContextType | any | undefined>(
  undefined
);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
