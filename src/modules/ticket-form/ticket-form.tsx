import {
  Button,
  Checkbox,
  Form,
  Input,
  DatePicker,
  Select,
  Image,
  notification,
  InputNumber,
} from "antd";
import type { DatePickerProps } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../store/store";
import { bookTicketAction } from "../../store/reducers/ticketsListReducer";
import {
  fetchTicketDetailsAction,
  updateTicketAction,
} from "../../store/reducers/ticketDetailsReducer";

export default function TicketForm(): JSX.Element {
  const params = useParams();

  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const [form] = Form.useForm();

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  let allowedDateFormats = [
    "DD/MM/YYYY",
    "D/M/YYYY",
    "DD.MM.YYYY",
    "D.M.YYYY",
    "DD. MM. YYYY",
    "D. M. YYYY",
    "DD-MM-YYYY",
  ];

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(moment(date).format("DD/MM/YYYY"));
  };

  useEffect(() => {
    if (params.id) {
      dispatch(fetchTicketDetailsAction(+params.id));
    }
  }, [params.id]);

  const { ticketDetails } = useSelector(
    (state: RootState) => state.ticketDetailsReducer
  );

  useEffect(() => {
    if (ticketDetails) {
      form.setFieldsValue({
        ...ticketDetails,
        ngayDen: moment(ticketDetails.ngayDen),
        ngayDi: moment(ticketDetails.ngayDi),
      });
    }
  }, [ticketDetails]);

  const onFinish = (values: any) => {
    const { maPhong, ngayDen, ngayDi, soLuongKhach, maNguoiDung } = values;

    console.log(ngayDen.format("DD/MM/YYYY"));

    if (params.id) {
      values.id = +params.id;

      const payload = {
        submitData: {
          submitData: {
            id: 0,
            maPhong,
            ngayDen: ngayDen.format("YYYY-MM-DD"),
            ngayDi: ngayDi.format("YYYY-MM-DD"),
            soLuongKhach,
            maNguoiDung,
          },
          id: +params.id,
        },
        callback: navigate,
        destination: "admin/booking-management",
      };
      dispatch(updateTicketAction(payload));

      console.log(payload);
    } else {
      values.id = 0;

      const payload = {
        submitData: {
          id: 0,
          maPhong,
          ngayDen: ngayDen.format("YYYY-MM-DD"),
          ngayDi: ngayDi.format("YYYY-MM-DD"),
          soLuongKhach,
          maNguoiDung,
        },
        callback: navigate,
        destination: "admin/booking-management",
      };
      dispatch(bookTicketAction(payload));
    }
  };

  return (
    <Form
      form={form}
      name="basic"
      layout="vertical"
      //initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ padding: 0, width: "90%", margin: "auto" }}
      autoComplete="off"
    >
      <Form.Item
        label="M?? ph??ng"
        name="maPhong"
        rules={[{ required: true, message: "M?? ph??ng kh??ng ???????c b??? tr???ng!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Ng??y ?????n"
        name="ngayDen"
        rules={[{ required: true, message: "Ng??y ?????n kh??ng ???????c b??? tr???ng!" }]}
      >
        <DatePicker onChange={onChange} format={allowedDateFormats} />
      </Form.Item>
      <Form.Item
        label="Ng??y ??i"
        name="ngayDi"
        rules={[{ required: true, message: "Ng??y ??i kh??ng ???????c b??? tr???ng!" }]}
      >
        <DatePicker onChange={onChange} format={allowedDateFormats} />
      </Form.Item>
      <Form.Item
        label="S??? l?????ng kh??ch"
        name="soLuongKhach"
        rules={[
          { required: true, message: "S??? l?????ng kh??ch kh??ng ???????c b??? tr???ng" },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="M?? ng?????i d??ng"
        name="maNguoiDung"
        rules={[
          { required: true, message: "M?? ng?????i d??ng kh??ng ???????c b??? tr???ng!" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
