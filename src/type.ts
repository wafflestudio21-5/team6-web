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
  my_rate: RateType | null;
  my_comment: MyCommentType | null;
};

export type RateType = {
  id: number;
  my_rate: number;
};

export type ContentResTypeInRatingsPage = {
  id: number;
  movie: ContentType;
  rate: number;
};

/**
 *export type CommentType = {
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

 * 
 * 
 */

export type MyCommentType = {
  id: number;
  my_comment: string;
  has_spoiler: boolean; // 바꿔야 할 수 있음
};

export type CommentType = {
  id: number;
  created_by: {
    id: number;
    nickname: string;
    profile_photo: string | null;
  };
  rating: null | string;
  like_count: number;
  content: string;
  has_spoiler: boolean;
  created_at: string;
  updated_at: string;
  movie: string;
};

export type CommentInUserPageType = {
  id: number;
  created_by: {
    id: number;
    username: string;
    nickname: string;
    profile_photo: null | string;
    background_photo: null | string;
  };
  movie: {
    movieCD: string;
    title_ko: string;
    poster: string;
    release_date: string;
  };
  content: string;
  rating: null | string;
  created_at: string;
  updated_at: string;
  likes_count: number;
  reply_count: number;
};

export type CommentsResType = {
  results: CommentType[];
  next: string | null;
  previous: string | null;
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
