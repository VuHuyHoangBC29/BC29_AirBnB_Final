import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { Col, Divider, message, Row } from "antd";
import { Button, Radio } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Image } from "antd";
import { Avatar, Card, List, Space, Dropdown, Menu } from "antd";
import type { MenuProps } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { fetchLocationsListAction } from "../../store/reducers/locationsListReducer";
import { fetchRoomsListAction } from "../../store/reducers/roomsListReducer";
import { Link, useParams } from "react-router-dom";
import LocationsMap from "../../modules/locations/locations-map/locations-map";

import "./locations.scss";

export default function Locations() {
  const style: React.CSSProperties = {
    background: "white",
  };

  const locationInfoStyle: React.CSSProperties = {
    background: "white",
  };

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const dispatch = useDispatch<AppDispatch>();

  const params = useParams();

  useEffect(() => {
    dispatch(fetchRoomsListAction());
    dispatch(fetchLocationsListAction());
  }, []);

  const { roomsList } = useSelector(
    (state: RootState) => state.roomsListReducer
  );

  const { locationsList } = useSelector(
    (state: RootState) => state.locationsListReducer
  );

  console.log(locationsList);

  const [province, setProvince] = useState<string>(
    params.provinceId ? params.provinceId : "ALL"
  );

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    console.log(e.key);

    setProvince(e.key);
  };

  const provinceDropdownMenu = locationsList.map((ele, idx) => {
    return {
      label: <div>{ele.tinhThanh}</div>,
      key: `${ele.id}`,
    };
  });

  provinceDropdownMenu.push({
    label: <div>T???t c???</div>,
    key: "ALL",
  });

  const provincesMenu = (
    <Menu onClick={handleMenuClick} items={provinceDropdownMenu} />
  );

  let filteredNewRoomsList = [...roomsList];

  if (province !== "ALL") {
    filteredNewRoomsList = roomsList.filter((ele) => ele.maViTri === +province);
  }

  console.log(filteredNewRoomsList);

  const roomProperty = {
    banLa: "B??n l??",
    banUi: "B??n ???i",
    bep: "B???p",
    dieuHoa: "??i???u h??a",
    doXe: "????? xe",
    giaTien: "Gi?? ti???n",
    giuong: "Gi?????ng",
    hinhAnh: "H??nh ???nh",
    hoBoi: "H??? b??i",
    id: "id",
    khach: "Kh??ch",
    maViTri: "M?? v??? tr??",
    mayGiat: "M??y gi???t",
    moTa: "M?? t???",
    phongNgu: "Ph??ng ng???",
    phongTam: "Ph??ng t???m",
    tenPhong: "T??n ph??ng",
    tivi: "Tivi",
    wifi: "Wifi",
  };

  let roomContentArr: string[] = [];

  filteredNewRoomsList.forEach((ele, idx) => {
    let contentForEachRoom = "";
    for (const property in ele) {
      if (
        property === "id" ||
        property === "moTa" ||
        property === "hinhAnh" ||
        property === "tenPhong" ||
        property === "giaTien" ||
        property === "maViTri"
      ) {
        contentForEachRoom += "";
      } else if (ele[property as keyof typeof ele] === false) {
        contentForEachRoom += "";
      } else if (ele[property as keyof typeof ele] === true) {
        contentForEachRoom += roomProperty[property as keyof typeof ele] + ", ";
      } else {
        contentForEachRoom +=
          ele[property as keyof typeof ele] +
          " " +
          roomProperty[property as keyof typeof ele] +
          ", ";
      }
    }
    roomContentArr.push(contentForEachRoom);
  });

  const filteredNewRoomsListData = filteredNewRoomsList.map((ele, idx) => ({
    link: `/booking/${ele.id}`,
    title: ele.tenPhong,
    avatar: "https://joeschmoe.io/api/v1/random",
    description: `$${ele.giaTien}/th??ng `,
    content: `${roomContentArr[idx]}`,
    image: ele.hinhAnh,
  }));

  return (
    <div id="locations">
      <h2>Ch??? ??? t???i khu v???c ???? ch???n</h2>
      <Row gutter={{ lg: 32 }}>
        <Col className="gutter-row" xs={24} lg={12}>
          <div id="locationsFilter">
            <Row justify="start" gutter={{ xs: 8, lg: 16 }}>
              <Col style={{ margin: "5px 0" }} md={24} xxl={10}>
                <Row gutter={{ xs: 8, lg: 16 }}>
                  <Col
                    style={{ margin: "5px 0" }}
                    className="gutter-row"
                    xl={6}
                    xxl={8}
                  >
                    <Button
                      style={{ marginRight: "10px", width: "100%" }}
                      type="primary"
                      shape="round"
                    >
                      Lo???i n??i ???
                    </Button>
                  </Col>
                  <Col
                    style={{ margin: "5px 0" }}
                    className="gutter-row"
                    xl={6}
                    xxl={8}
                  >
                    <Button
                      style={{ marginRight: "10px", width: "100%" }}
                      type="primary"
                      shape="round"
                    >
                      Gi??
                    </Button>
                  </Col>
                  <Col
                    style={{ margin: "5px 0" }}
                    className="gutter-row"
                    xl={6}
                    xxl={8}
                  >
                    <Button
                      style={{ marginRight: "10px", width: "100%" }}
                      type="primary"
                      shape="round"
                    >
                      ?????t ngay
                    </Button>
                  </Col>
                </Row>
              </Col>

              <Col style={{ margin: "5px 0" }} md={24} xxl={14}>
                <Row gutter={{ xs: 8, lg: 16 }}>
                  <Col
                    style={{ margin: "5px 0" }}
                    className="gutter-row"
                    lg={12}
                  >
                    <Button
                      style={{ marginRight: "10px", width: "100%" }}
                      type="primary"
                      shape="round"
                    >
                      Ph??ng v?? ph??ng ng???
                    </Button>
                  </Col>
                  <Col
                    style={{ margin: "5px 0" }}
                    className="gutter-row"
                    lg={6}
                  >
                    <Button
                      style={{ marginRight: "10px", width: "100%" }}
                      type="primary"
                      shape="round"
                    >
                      B??? l???c kh??c
                    </Button>
                  </Col>
                  <Col
                    style={{ margin: "5px 0" }}
                    className="gutter-row"
                    lg={6}
                  >
                    <Dropdown overlay={provincesMenu} trigger={["click"]}>
                      <a onClick={(e) => e.preventDefault()}>
                        <Space>
                          <Button
                            style={{ marginRight: "10px", width: "100%" }}
                            type="primary"
                            shape="round"
                          >
                            T???nh th??nh
                          </Button>
                        </Space>
                      </a>
                    </Dropdown>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>

          <div className="locationsList">
            <div className="roomInfo">
              <List
                itemLayout="vertical"
                size="large"
                pagination={{
                  onChange: (page) => {
                    console.log(page);
                  },
                  pageSize: 5,
                }}
                dataSource={filteredNewRoomsListData}
                renderItem={(item, idx) => (
                  <List.Item
                    style={{ paddingLeft: "0px" }}
                    key={idx}
                    extra={
                      <img
                        width={272}
                        alt="logo"
                        src={item.image}
                        // src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                      />
                    }
                  >
                    <List.Item.Meta
                      // avatar={<Avatar src={item.avatar} />}
                      // title={<a href={item.href}>{item.title}</a>}
                      title={<Link to={item.link}>{item.title}</Link>}
                      description={item.description}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </div>
          </div>

          {/* <LocationsList /> */}
        </Col>
        <Col className="gutter-row" xs={24} lg={12}>
          <div style={style}>
            <LocationsMap province={province} />
          </div>
        </Col>
      </Row>
    </div>
  );
}
