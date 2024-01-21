export type MovieType = {
  name: string;
  releaseYear: string;
  country: string;
  posterUrl: string;
  rating: number;
};
export type TestType = {
  message: string;
};

export type UserDataType = {
  id: number;
  username: string;
  nickname: string;
  bio: string;
  profile_photo: string | null;
  background_photo: string | null;
  followers_count: number;
  following_count: number;
};
export type FollowerType = {
  id: 17;
  username: string;
  nickname: string;
  bio: string;
  profile_photo: string | null;
  background_photo: string | null;
};
export type FollowerListType = FollowerType[];
