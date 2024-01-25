type PeopleType = {
  peopleCD: string;
  name: string;
  photo?: string;
};

// 각 페이지 별로 영화나 코멘트 데이터의 속성이 다르므로 각각 다르게 정의해야 합니다

// 영화 개별 페이지에서 받아오는 MovieType
export type MovieType = {
  movieCD: string;
  directors: PeopleType[];
  writers: PeopleType[];
  castings: {
    actor: PeopleType;
    role: string;
    priority: number;
  }[];
  genres: { genre: string }[];
  title_ko: string;
  title_original: string;
  plot: string;
  runtime: number;
  prod_country: string;
  poster: string;
  release_date: string;
  // option
  cumulative_audience: number | null;
  screening: boolean;
  average_rate: number;
  my_state: MyStateResType | null;
  my_rate: {
    id: number;
    my_rate: number;
  } | null;
  my_comment: CommentType | null;
};

export type MyStateResType = {
  id: number;
  user_state: MyStateType | null;
};
export type MyStateType =
  | "watching"
  | "want_to_watch"
  | "not_interested"
  | null;

// 유저가 평가한 영화 리스트에 필요한 MovieType
export type MovieResByUserType = {
  id: number;
  rate: number | null;
  movie: MovieByUserType;
};
export type MovieByUserType = {
  cumulative_audience: number | null;
  screening: boolean;
  movieCD: string;
  plot: string;
  runtime: number;
  prod_country: string;
  poster: string;
  title_ko: string;
  title_original: string;
  release_date: string;
};

export type MovieByStorageSubType = MovieResByUserType & {
  user_state: "watching" | "want_to_watch" | "not_interested" | null;
  user_state_display: "watching" | "want_to_watch" | "not_interested" | null;
};

export type MoviesResType = {
  results: MovieResByUserType[];
  next: string | null;
  previous: string | null;
  count: number;
};

export type CommentsResType = {
  results: CommentType[];
  next: string | null;
  previous: string | null;
  count: number;
};

export type CommentType = {
  id: number;
  created_by: {
    id: number;
    nickname: string;
    profile_photo: string | null;
  };
  rating: null | { rate: number };
  like_count: number;
  likes_count: number; // 서버에서 네이밍 바꿔야 하는데 일단 임시로 추가
  reply_count: number;
  liked_by_user: boolean;
  content: string; // 코멘트 내용
  has_spoiler: boolean;
  created_at: string;
  updated_at: string;
  movie: {
    movieCD: string;
    poster: string;
    title_ko: string;
    release_date: string;
  };
};

export type ReplyType = {
  id: number;
  created_by: {
    id: number;
    nickname: string;
    profile_photo: null | string;
  };
  comment: {
    id: number;
    created_by: number;
    movie: string;
  };
  like_count: number;

  liked_by_user: boolean;
  content: string;
  created_at: string;
  updated_at: string;
};

// 유저 하위페이지의 코멘트 리스트에 필요한 CommentType

export type UserDataType = {
  id: number;
  username: string;
  nickname: string;
  bio: string;
  profile_photo: string | null;
  background_photo: string | null;
  followers_count: number;
  following_count: number;
  liked_comment_num: number;
  comment_num: number;
  rate_num: number;
};

export type FollowType = {
  id: number;
  username: string;
  nickname: string;
  bio: string;
  profile_photo: string | null;
  background_photo: string | null;
};
export type FollowListType = FollowType[];

export type SortQueryType = "like" | "created" | "high-rating" | "low-rating";
