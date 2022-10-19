export interface Ticket {
  id: number;
  maPhong: number;
  ngayDen: string;
  ngayDi: string;
  soLuongKhach: number;
  maNguoiDung: number;
  tenPhong?: string;
  hinhAnh?: string;
}

export interface BookTicketThunk {
  submitData: Ticket;
  callback: Function;
  destination: string;
}

export interface UpdateTicketApi {
  submitData: {
    id: number;
    maPhong: number;
    ngayDen: string;
    ngayDi: string;
    soLuongKhach: number;
    maNguoiDung: number;
  };
  id: number;
}

export interface UpdateTicketThunk {
  submitData: UpdateTicketApi;
  callback: Function;
  destination: string;
}

export interface deleteTicketByUserThunk {
  maVe: number;
  maNguoiDung: number;
}
