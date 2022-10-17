import { AxiosPromise } from "axios";
import { request } from "../config/axios";
import {
  deleteTicketByUserThunk,
  Ticket,
  UpdateTicketApi,
} from "../interfaces/ticket";

export const fetchTicketListApi = (): AxiosPromise<HttpResponse<Ticket[]>> => {
  return request({
    url: `/dat-phong`,
    method: "GET",
  });
};

export const fetchTicketDetailsApi = (
  id: number
): AxiosPromise<HttpResponse<Ticket>> => {
  return request({
    url: `dat-phong/${id}`,
    method: "GET",
  });
};

export const bookTicketApi = (
  data: Ticket
): AxiosPromise<HttpResponse<Ticket>> => {
  return request({
    url: `/dat-phong`,
    method: "POST",
    data,
  });
};

export const fetchTicketListByUserApi = (
  id: number
): AxiosPromise<HttpResponse<Ticket[]>> => {
  return request({
    url: `/dat-phong/lay-theo-nguoi-dung/${id}`,
    method: "GET",
  });
};

export const updateTicketApi = (
  data: UpdateTicketApi
): AxiosPromise<HttpResponse<Ticket>> => {
  return request({
    url: `dat-phong/${data.id}`,
    method: "PUT",
    data: data.submitData,
  });
};

export const deleteTicketApi = (id: number) => {
  return request({
    url: `dat-phong/${id}`,
    method: "DELETE",
  });
};
