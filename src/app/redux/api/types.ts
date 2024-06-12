import { TypeOf, object, string } from "zod";

const registerSchema = object({
  name: string().min(1, "Full name is required").max(100),
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

const loginSchema = object({
  email: string()
    .min(1, "Email address is required")
    .email("Email Address is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export type RegisterRequest = TypeOf<typeof registerSchema>;

export type RegisterResponse = {
  email: string | null;
  id: string | null;
};

export type LoginRequest = TypeOf<typeof loginSchema>;

export type LoginResponse = {
  accessToken: string | null;
  refreshToken: string | null;
  sid: string | null;
  userData: {
    name: string | null;
    email: string | null;
    goingToRead: [
      {
        title: string | null;
        author: string | null;
        publishYear: number | null;
        pagesTotal: number | null;
        pagesFinished: number | null;
        _id: string | null;
        _v: number | null;
      }
    ];
    currentlyReading: [];
    finishedReading: [];
    id: string | null;
  };
};
export type refreshTokenRequest = {
  sid: string;
};
export type refreshTokenResponse = {
  newAccessToken: string;
  newRefreshToken: string;
  newSid: string;
};
export interface Book {
  title: string;
  author: string;
  publishYear: number;
  pagesTotal: number;
  pagesFinished: number;
  _id: string;
  _v: number;
}
export type userData = {
  name: string;
  email: string;
  goingToRead: Book[];
  currentlyReading: Book[];
  finishedReading: Book[];
};

export type addBookRequest = {
  title: string;
  author: string;
  publishYear: number;
  pagesTotal: number;
};

export type addBookResponse = {
  title: string | null;
  author: string | null;
  publishYear: number | null;
  pagesTotal: number | null;
  pagesFinished: number | null;
  _id: string | null;
  __v?: number | null;
};

export type bookReviewRequest = {
  rating: number;
  feedback: string;
};

export type bookReviewResponse = {
  title: string;
  author: string;
  publishYear: number;
  totalPages: number;
  pagesFinished: number;
  rating: number;
  feedback: string;
  _id: string;
  __v: number;
};
export type startPlanningRequest = {
  startDate: string;
  endDate: string;
  books: string[];
};
export type startPlanningResponse = {
  startDate: Date | null;
  endDate: Date | null;
  books: [
    {
      title: string | null;
      author: string | null;
      publishYear: number | null;
      pagesTotal: number | null;
      pagesFinished: number | null;
      rating: number | null;
      feedback: string | null;
      _id: string | null;
      __v: number | null;
    }]
  ;
  duration: number | null;
  pagesPerDay: number | null;
  stats: {
    date: Date | null;
    pagesCount: number | null;
  };
  _id: string | null;
};
export type addPlanningRequest = {
  pages: number;
};
export type addPlanningResponse = {
  book: {
    title: string;
    author: string;
    publishYear: number;
    totalPages: number;
    pagesFinished: number | null;
    _id: string;
    __v: number;
  };
  planning: {
    startDate: Date;
    endDate: Date;
    books: [
      {
        _id: string;
        duration: number;
        pagesPerDay: number;
        stats: {
          date: Date;
          pagesCount: number;
        };
      }
    ];
    _id: string;
  };
};

export type ChartData = {
  plan: number;
  fact: number;
};
export type addChartResult = { date: Date; pages: number };
export type prepareHeaders = (
  headers: Headers,
  api: {
    getState: () => unknown;
    extra: unknown;
    endpoint: string;
    type: "query" | "mutation";
    forced: boolean | undefined;
  }
) => Headers | void;
