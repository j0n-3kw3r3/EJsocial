import { createContext, useReducer } from "react";
import AuthReduser from "./AuthReducer";

const Initial_State = {
  user: {
    _id: "63c29a0d65a6342eb3e2b102",
    coverPictue: "",
    createdAt: "2023-01-14T12:03:25.854Z",
    desc: "Backend Dev",
    email: "john@gmail",
    followers: [],
    followings: [
    ],
    isAdmin: false,
    password: "$2b$10$jq/Cgis6F.q2RJ3jATX0Y.OncDrXB/arGYec5tysDYQjSsLwb.8Ya",
    profilePicture: "person/1.jpeg",
    updatedAt: "2023-01-26T16:13:25.088Z",
    username: "john",
    city: "London",
    from: "Newzealand",
    relationship: 1,
    __v: 0,
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(Initial_State);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReduser, Initial_State);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
