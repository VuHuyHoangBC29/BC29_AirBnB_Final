import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { notification } from "antd";
import { Ticket, UpdateTicketThunk } from "../../interfaces/ticket";
import { fetchTicketDetailsApi, updateTicketApi } from "../../services/ticket";

export const fetchTicketDetailsAction = createAsyncThunk(
  "ticketDetails/fetchTicketDetails",
  async (id: number) => {
    const response = await fetchTicketDetailsApi(id);

    return response.data.content;
  }
);

export const updateTicketAction = createAsyncThunk(
  "ticketDetails/updateTicket",
  async (data: UpdateTicketThunk) => {
    const response = await updateTicketApi(data.submitData);

    notification.success({
      message: "Cập nhật vé thành công!",
    });

    data.callback(`/${data.destination}`);

    return response.data.content;
  }
);

interface TicketDetailsState {
  ticketDetails: Ticket | null;
}

const INITIAL_STATE: TicketDetailsState = {
  ticketDetails: null,
};

const ticketDetailsSlice = createSlice({
  name: "ticketDetails",
  initialState: INITIAL_STATE,
  reducers: {
    handleRemoveTicketDetails(
      state: TicketDetailsState,
      action: PayloadAction<null>
    ) {
      state.ticketDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchTicketDetailsAction.fulfilled,
      (state: TicketDetailsState, action: PayloadAction<Ticket>) => {
        state.ticketDetails = action.payload;
      }
    );
    builder.addCase(
      updateTicketAction.fulfilled,
      (state: TicketDetailsState, action: PayloadAction<Ticket>) => {
        state.ticketDetails = action.payload;
      }
    );
  },
});

export const ticketDetailsActions = ticketDetailsSlice.actions;
export const ticketDetailsReducer = ticketDetailsSlice.reducer;
