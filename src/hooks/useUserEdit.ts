import { ChangeEvent, FormEvent, useState } from "react";
import { useAuthContext } from "../contexts/authContext";
import { putUserPhotoUpdate, putUserUpdate } from "../apis/user";
import { defaultResponseHandler } from "../apis/custom";

export default function useUserEdit() {
  const { myUserData, accessToken, setMyUserData } = useAuthContext();
  const [nickname, setNickname] = useState(myUserData?.nickname ?? "");
  const [bio, setBio] = useState(myUserData?.bio ?? "");
  const [backgroundPhotoFile, setBackgroundPhotoFile] = useState<File | null>(
    null
  );
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [backgroundPhotoUrl, setBackgroundPhotoUrl] = useState(
    myUserData?.background_photo ?? ""
  );
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(
    myUserData?.profile_photo ?? ""
  );

  const handleBackgroundPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const previewPhotoUrl = e.target?.result as string | null | undefined;
      setBackgroundPhotoFile(file ?? null);
      setBackgroundPhotoUrl(previewPhotoUrl ?? "");
    };
    file && reader.readAsDataURL(file);
  };

  const handleProfilePhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const previewPhotoUrl = e.target?.result as string | null | undefined;
      setProfilePhotoFile(file ?? null);
      setProfilePhotoUrl(previewPhotoUrl ?? "");
    };
    file && reader.readAsDataURL(file);
  };

  const handleNickname = (e: ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleBio = (e: ChangeEvent<HTMLInputElement>) => {
    setBio(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    accessToken &&
      myUserData &&
      putUserUpdate(nickname, bio, accessToken)
        .then(defaultResponseHandler)
        .then((data) => {
          setMyUserData(data);
        })
        .catch((e) => alert(e));

    accessToken &&
      myUserData &&
      (backgroundPhotoFile || profilePhotoFile) &&
      putUserPhotoUpdate(backgroundPhotoFile, profilePhotoFile, accessToken)
        .then(defaultResponseHandler)
        .then((data) => {
          setMyUserData(data);
        })
        .catch((e) => alert(e));
  };

  return {
    nickname,
    bio,
    profilePhotoUrl,
    backgroundPhotoUrl,
    handleBackgroundPhoto,
    handleProfilePhoto,
    handleNickname,
    handleBio,
    handleSubmit,
  };
}
