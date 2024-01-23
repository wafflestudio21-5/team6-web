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
  titleKo: string;
  titleOriginal: string;
  plot: string;
  runtime: number;
  prodCountry: string;
  poster: string;
  releaseDate: string;
  // option
  cumulativeAudience: number | null;
  screening: boolean;
  averageRate: number;
  my_rate: {
    id: number;
    my_rate: number;
  } | null;
  my_comment: {
    id: number;
    my_comment: string;
    has_spoiler: boolean; // 바꿔야 할 수도 있음
  } | null;
};

// 유저가 평가한 영화 리스트에 필요한 MovieType
export type MovieByUserType = {
  id: number;
  rate: number | null;
  movie: {
    cumulativeAudience: number | null;
    screening: boolean;
    movieCD: string;
    plot: string;
    runtime: number;
    prodCountry: string;
    poster: string;
    titleKo: string;
    titleOriginal: string;
    releaseDate: string;
  };
};

export type MovieByStorageSubType = MovieByUserType & {
  user_state: "watching" | "want_to_watch" | "not_interested" | null;
  user_state_display: "watching" | "want_to_watch" | "not_interested" | null;
};

export type MoviesResType = {
  results: MovieByUserType[];
  next: string | null;
  previous: string | null;
  count: number;
};

export type CommentsResType = {
  results: CommentType[] | CommentByUserType[];
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
  liked_by_user: boolean;
  content: string; // 코멘트 내용
  has_spoiler: boolean;
  created_at: string;
  updated_at: string;
  movie: string;
};

// 유저 하위페이지의 코멘트 리스트에 필요한 CommentType
export type CommentByUserType = CommentType & {
  movie: {
    movieCD: string;
    release_date: string;
    poster: string;
    title_ko: string;
  };
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
