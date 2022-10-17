import { AnyAction, combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk, { ThunkDispatch } from "redux-thunk";
import { locationDetailsReducer } from "./reducers/locationDetailsReducer";
import { locationsListReducer } from "./reducers/locationsListReducer";
import { userDetailsReducer } from "./reducers/userDetailsReducer";
import { usersListReducer } from "./reducers/usersListReducer";
import { authenticationReducer } from "./reducers/authenicationReducer";
import { roomDetailsReducer } from "./reducers/roomDetailsReducer";
import { roomsListReducer } from "./reducers/roomsListReducer";
import { commentsListReducer } from "./reducers/commentsListReducer";
import { ticketDetailsReducer } from "./reducers/ticketDetailsReducer";
import { ticketsListReducer } from "./reducers/ticketsListReducer";

const rootReducer = combineReducers({
  authenticationReducer,
  commentsListReducer,
  locationDetailsReducer,
  locationsListReducer,
  roomDetailsReducer,
  roomsListReducer,
  ticketDetailsReducer,
  ticketsListReducer,
  userDetailsReducer,
  usersListReducer,
});

export const store = configureStore({
  reducer: persistReducer(
    {
      key: "root",
      storage: storage,
      whitelist: [
        "locationDetailsReducer",
        "locationsListReducer",
        "authenticationReducer",
        "userDetailsReducer",
        "usersListReducer",
        "roomDetailsReducer",
        "roomsListReducer",
        "commentsListReducer",
        "ticketDetailsReducer",
        "ticketsListReducer",
      ],
    },
    rootReducer
  ),
  devTools: true,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store["getState"]>;

export type AppDispatch = typeof store["dispatch"] &
  ThunkDispatch<RootState, void, AnyAction>;
