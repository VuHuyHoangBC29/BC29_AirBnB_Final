import React, { useEffect, useState } from "react";
import {
  CloseOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Card, Col, Modal, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  deleteTicketAction,
  deleteTicketByUserAction,
  // deleteTicketByUserAction,
  fetchTicketsListByUserAction,
} from "../../store/reducers/ticketsListReducer";
import { AppDispatch, RootState } from "../../store/store";
import { fetchRoomDetailsAction } from "../../store/reducers/roomDetailsReducer";
import { fetchRoomDetailsApi } from "../../services/room";
import { fetchTicketDetailsApi } from "../../services/ticket";
import moment from "moment";
import { fetchRoomsListAction } from "../../store/reducers/roomsListReducer";

const { Meta } = Card;

export default function ProfileTicketModule() {
  const params = useParams();

  console.log(params.userId);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (params.userId) {
      dispatch(fetchTicketsListByUserAction(+params.userId));
    }
  }, [params.userId]);

  const { ticketsList } = useSelector(
    (state: RootState) => state.ticketsListReducer
  );

  const renderTicketsListByUser = () => {
    return ticketsList.map((ele, idx) => {
      const handleDelete = () => {
        const maVe = ele.id;
        const maNguoiDung = ele.maNguoiDung;

        const submitData = {
          maVe,
          maNguoiDung,
        };

        dispatch(deleteTicketByUserAction(submitData));
      };

      return (
        <>
          <Col className="gutter-row" span={6}>
            <Card
              style={{ width: "100%", marginBottom: "15px" }}
              key={idx}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <EditOutlined key="edit" />,
                <CloseOutlined key="delete" onClick={handleDelete} />,
              ]}
            >
              <Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={`Mã vé: ${ele.id}`}
                description={`Mã phòng: ${ele.maPhong}`}
              />
              <h5 style={{ marginTop: "20px" }}>
                Số khách: {ele.soLuongKhach}
              </h5>
            </Card>
          </Col>
        </>
      );
    });
  };

  return (
    <div>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        {renderTicketsListByUser()}
      </Row>
    </div>
  );
}
