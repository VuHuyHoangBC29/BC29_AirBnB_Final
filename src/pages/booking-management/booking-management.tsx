import { Table, Input, Space, Button } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import React, { useContext, useEffect, useState } from "react";
import {
  EditOutlined,
  SolutionOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  deleteTicketAction,
  fetchTicketsListAction,
} from "../../store/reducers/ticketsListReducer";
import { ticketDetailsActions } from "../../store/reducers/ticketDetailsReducer";
import { LoadingContext } from "../../context/loading.context";

export default function BookingManagement(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector(
    (state: RootState) => state.ticketsListReducer
  );

  const { ticketsList } = useSelector(
    (state: RootState) => state.ticketsListReducer
  );

  const { isLoading, setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    dispatch(fetchTicketsListAction());
    dispatch(ticketDetailsActions.handleRemoveTicketDetails(null));
  }, []);

  useEffect(() => {
    console.log(loading);
    if (loading === "pending") {
      setIsLoading({ isLoading: true, setIsLoading });
    } else {
      setIsLoading({ isLoading: false, setIsLoading });
    }
  }, [loading, setIsLoading]);

  const navigate = useNavigate();
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const enterLoading = (index: number) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });

    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        navigate("/admin/booking-management/create-ticket");
        return newLoadings;
      });
    }, 1000);
  };

  interface DataType {
    key: React.Key;
    id: number;
    maPhong: number;
    ngayDen: string;
    ngayDi: string;
    soLuongKhach: number;
    maNguoiDung: number;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      width: "5%",
    },
    {
      title: "M?? Ph??ng",
      dataIndex: "maPhong",
      width: "5%",
      //   filters: [
      //     {
      //       text: "Joe",
      //       value: "Joe",
      //     },
      //     {
      //       text: "Jim",
      //       value: "Jim",
      //     },
      //   ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      //   onFilter: (value, record) => record.name.indexOf(value as string) === 0,
      // sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Ng??y ?????n",
      dataIndex: "ngayDen",
      width: "10%",
    },
    {
      title: "Ng??y ??i",
      dataIndex: "ngayDi",
      width: "10%",
    },
    {
      title: "S??? l?????ng kh??ch",
      dataIndex: "soLuongKhach",
      width: "5%",
      defaultSortOrder: "descend",
      //   sorter: (a, b) => a.age - b.age,
    },
    {
      title: "M?? ng?????i d??ng ",
      dataIndex: "maNguoiDung",
      width: "5%",
      defaultSortOrder: "descend",
      //   sorter: (a, b) => a.age - b.age,
    },
    {
      title: "T????ng t??c",
      dataIndex: "tuongTac",
      width: "5%",
      render: (text: number) => {
        return (
          <div className="d-flex">
            <NavLink
              className="pl-4"
              to={`/admin/booking-management/${text}/edit-ticket`}
            >
              <EditOutlined />
            </NavLink>
            <a
              className="ml-4"
              onClick={() => {
                dispatch(deleteTicketAction(text));
              }}
            >
              <DeleteOutlined />
            </a>
          </div>
        );
      },
    },
  ];

  const data = ticketsList?.map((ele, index) => {
    return {
      key: index + 1,
      id: ele.id,
      maPhong: ele.maPhong,
      ngayDen: ele.ngayDen,
      ngayDi: ele.ngayDi,
      soLuongKhach: ele.soLuongKhach,
      maNguoiDung: ele.maNguoiDung,
      tuongTac: ele.id,
    };
  });

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    // console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <>
      <Space
        style={{ width: "100%" }}
        direction="vertical"
        className="w-100 py-3"
      >
        <Button
          type="primary"
          loading={loadings[0]}
          onClick={() => enterLoading(0)}
        >
          ?????t ph??ng
        </Button>
      </Space>
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </>
  );
}
