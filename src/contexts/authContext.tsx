import { createContext, useContext, useState } from "react";

type AuthContextType = {
  myUserData: MyUserType;
  setMyUserData: (authData: MyUserType) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  isLogined: boolean;
  autoLoginConfirmed: boolean;
  setAutoLoginConfirmed: (autoLoginConfirmed: boolean) => void;
};

type MyUserType = {
  id: number;
  username: string;
  nickname: "string";
  bio: string;
  profile_photo: string | null;
  background_photo: string | null;
  followers_count: number;
  following_count: number;
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
  const [myUserData, setMyUserData] = useState<MyUserType>({} as MyUserType);
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
