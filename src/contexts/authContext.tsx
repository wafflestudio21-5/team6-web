import { createContext, useContext, useState } from "react";

type AuthDataType = {
  user: {};
  accessToken: string | null;
};

type AuthContextType = {
  authData: AuthDataType;
  setAuthData: (authData: AuthDataType) => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export function useAuthContext() {
  return useContext(AuthContext);
}

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authData, setAuthData] = useState<AuthDataType>({
    user: { nickname: "오수현", username: "sh020119" },
    accessToken: null,
  });

  return (
    <AuthContext.Provider value={{ authData, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}
