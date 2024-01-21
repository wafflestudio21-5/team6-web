import { createContext, useContext, useState } from "react";
import { UserDataType } from "../type";
type AuthContextType = {

  myUserData: UserDataType | null;
  setMyUserData: (authData: UserDataType) => void;

  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  isLogined: boolean;
  autoLoginConfirmed: boolean;
  setAutoLoginConfirmed: (autoLoginConfirmed: boolean) => void;
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

  const [myUserData, setMyUserData] = useState<UserDataType | null>(null);

  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [autoLoginConfirmed, setAutoLoginConfirmed] = useState(false); // 맨 처음 자동 로그인 로직이 끝난 이후에 true
  const isLogined = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        myUserData,
        setMyUserData,
        isLogined,
        accessToken,
        setAccessToken,
        autoLoginConfirmed,
        setAutoLoginConfirmed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
