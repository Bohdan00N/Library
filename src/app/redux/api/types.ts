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
  error: string | null | undefined;
  accessToken: string | null;
  name: string;
};

export type LoginRequest = TypeOf<typeof loginSchema>;

export type LoginResponse = {
  accessToken: string | null;
  refreshToken: string | null;
  sid: string | null;
  userData: {
    name: string;
    email: string;
    goingToRead: string;
    currentlyReading: string;
    finishedReading: string;
    id: string;
  };
  error: string | null | undefined;
};

export type userData = {
  name: string;
  email: string;
  goingToRead: [
    {
      title: string;
      author: string;
      publishYear: number;
      pagesTotal: number;
      pagesFinished: number;
      _id: string;
      _v: number;
    }
  ];
  currentlyReading: string;
  finishedReading: string;
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
  pagesFinished?: number | null;
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
  _v: number;
};

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
// type RootState = {
//   authApi: CombinedState<{
//     registerUser: MutationDefinition<{
//       name: string;
//       email: string;
//       password: string;
//     }, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, RegisterResponse, "authApi">;
//     loginUser: MutationDefinition<...>;
//   }, never, "authApi">;
//   bookApi: CombinedState<...>;
//   auth: AuthState;
//   book: addBookResponse[];
// } & PersistPartial;
