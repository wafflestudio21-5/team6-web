type PeopleType = {
  peopleCD: string;
  name: string;
  photo?: string;
};

export type ContentType = {
  movieCD: string;
  directors: PeopleType[];
  writers: PeopleType[];
  castings: {
    actor: PeopleType;
    role: string;
    priority: number;
  }[];
  genres: { genre: string }[];
  titleKo: string;
  titleOriginal: string;
  plot: string;
  runtime: number;
  prodCountry: string;
  poster: string;
  releaseDate: string; // date
  // option
  cumulativeAudience: number | null;
  screening: boolean;
  averageRate: number;
  myRate: RateType | null;
};

export type RateType = {
  id: number;
  myRate: number;
};

export type CommentType = {
  id: number;
  createdBy: {
    id: number;
    nickname: string;
    profilePhoto: string | null;
  };
  rating: number | null;
  likeCount: number;
  content: string;
  hasSpoiler: false;
  createdAt: string; // date
  updatedAt: string; // date
  movie: string;
};

export type CommentsResType = {
  results: CommentType[];
  next: string | null;
  previous: string | null;
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
  id: number;
  username: string;
  nickname: string;
  bio: string;
  profile_photo: string | null;
  background_photo: string | null;
};
export type FollowerListType = FollowerType[];
