import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import {
  BookTicketThunk,
  deleteTicketByUserThunk,
  Ticket,
} from "../../interfaces/ticket";
import {
  bookTicketApi,
  deleteTicketApi,
  fetchTicketListApi,
  fetchTicketListByUserApi,
} from "../../services/ticket";

export const fetchTicketsListAction = createAsyncThunk(
  "ticketsList/fetchTicketsList",
  async () => {
    const response = await fetchTicketListApi();

    return response.data.content;
  }
);

export const fetchTicketsListByUserAction = createAsyncThunk(
  "ticketsList/fetchTicketsListByUser",
  async (id: number) => {
    const response = await fetchTicketListByUserApi(id);

    return response.data.content;
  }
);

export const bookTicketAction = createAsyncThunk(
  "ticketsList/bookTicket",
  async (data: BookTicketThunk) => {
    const response = await bookTicketApi(data.submitData);

    notification.success({
      message: "Đặt vé thành công!",
    });

    data.callback(`/${data.destination}`);

    return response.data.content;
  }
);

export const deleteTicketAction = createAsyncThunk(
  "ticketsList/deleteTicket",
  async (id: number) => {
    const response = await deleteTicketApi(id);

    notification.success({
      message: "Hủy vé thành công!",
    });

    const newTicketsList = await fetchTicketListApi();

    return newTicketsList.data.content;
  }
);

export const deleteTicketByUserAction = createAsyncThunk(
  "ticketsList/deleteTicketByUser",
  async (data: deleteTicketByUserThunk) => {
    const response = await deleteTicketApi(data.maVe);

    notification.success({
      message: "Hủy vé thành công!",
    });

    const newUserTicketsList = await fetchTicketListByUserApi(data.maNguoiDung);

    return newUserTicketsList.data.content;
  }
);

interface TicketsListState {
  ticketsList: Ticket[];
}

const INITIAL_STATE: TicketsListState = {
  ticketsList: [],
};

const ticketsListSlice = createSlice({
  name: "ticketsList",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchTicketsListAction.fulfilled,
      (state: TicketsListState, action: PayloadAction<Ticket[]>) => {
        state.ticketsList = action.payload;
      }
    );
    builder.addCase(
      fetchTicketsListByUserAction.fulfilled,
      (state: TicketsListState, action: PayloadAction<Ticket[]>) => {
        state.ticketsList = action.payload;
      }
    );
    builder.addCase(
      bookTicketAction.fulfilled,
      (state: TicketsListState, action: PayloadAction<Ticket>) => {
        let newTicketsList = [...state.ticketsList];

        newTicketsList.push(action.payload);

        state.ticketsList = newTicketsList;
      }
    );
    builder.addCase(
      deleteTicketAction.fulfilled,
      (state: TicketsListState, action: PayloadAction<Ticket[]>) => {
        state.ticketsList = action.payload;
      }
    );
    builder.addCase(
      deleteTicketByUserAction.fulfilled,
      (state: TicketsListState, action: PayloadAction<Ticket[]>) => {
        state.ticketsList = action.payload;
      }
    );
  },
});

export const ticketsListActions = ticketsListSlice.actions;
export const ticketsListReducer = ticketsListSlice.reducer;
