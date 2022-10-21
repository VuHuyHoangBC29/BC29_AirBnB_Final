import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../../context/loading.context";
import { CreateUser, User } from "../../interfaces/user";
import {
  createUserApi,
  deleteUserApi,
  fetchUserDetailedInfoApi,
  fetchUsersListApi,
  fetchUsersListByPageApi,
  fetchUsersSearchListApi,
} from "../../services/user";

export const fetchUsersListAction = createAsyncThunk(
  "userList/fetchUsersList",
  async () => {
    const response = await fetchUsersListApi();

    return response.data.content;
  }
);

export const fetchUsersListByPageAction = createAsyncThunk(
  "userList/fetchUsersList",
  async (page: number) => {
    const response = await fetchUsersListByPageApi(page);
    
    return response.data.content.data;
  }
);

export const fetchUsersSearchListAction = createAsyncThunk(
  "usersList/fetchUsersSearchList",
  async (name: string) => {
    const response = await fetchUsersSearchListApi(name);

    return response.data.content;
  }
);

export const createUserAction = createAsyncThunk(
  "usersList/createUser",
  async (data: CreateUser) => {
    const response = await createUserApi(data.submitData);

    notification.success({
      message: "Thêm người dùng thành công!",
    });

    data.callback("/admin");

    return response.data.content;
  }
);

export const deleteUserAction = createAsyncThunk(
  "usersList/deleteUser",
  async (id: number) => {
    const response = await deleteUserApi(id);

    const newUsersList = await fetchUsersListApi();

    return newUsersList.data.content;
  }
);

interface UsersListState {
  usersList: User[];
  loading: "pending" | "succeeded";
}

const INITIAL_STATE: UsersListState = {
  usersList: [],
  loading: "pending",
};

const usersListSlice = createSlice({
  name: "userList",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersListAction.pending, (state: UsersListState) => {
      state.loading = "pending";
    });
    builder.addCase(
      fetchUsersListAction.fulfilled,
      (state: UsersListState, action: PayloadAction<User[]>) => {
        state.usersList = action.payload;
        state.loading = "succeeded";
      }
    );
    // builder.addCase(
    //   fetchUsersListByPageAction.fulfilled,
    //   (state: UsersListState, action: PayloadAction<User[]>) => {
    //     state.usersList = action.payload;
    //   }
    // );
    builder.addCase(
      fetchUsersSearchListAction.fulfilled,
      (state: UsersListState, action: PayloadAction<User[]>) => {
        state.usersList = action.payload;
      }
    );
    builder.addCase(createUserAction.pending, (state: UsersListState) => {
      state.loading = "pending";
    });
    builder.addCase(
      createUserAction.fulfilled,
      (state: UsersListState, action: PayloadAction<User>) => {
        let newUsersList = [...state.usersList];

        newUsersList.push(action.payload);

        state.loading = "succeeded";
      }
    );
    builder.addCase(
      deleteUserAction.fulfilled,
      (state: UsersListState, action: PayloadAction<User[]>) => {
        state.usersList = action.payload;
      }
    );
  },
});

export const usersListActions = usersListSlice.actions;
export const usersListReducer = usersListSlice.reducer;
