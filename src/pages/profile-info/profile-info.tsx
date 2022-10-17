import { Col, Row } from "antd";
import ProfileInfoAvatar from "../../modules/profile-info/profile-info-avatar";
import ProfileInfoForm from "../../modules/profile-info/profile-info-form";

export default function ProfileInfo(): JSX.Element {
  return (
    <div id="profileInfo">
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 0 }}>
        <Col
          className="gutter-row"
          xs={{ offset: 0, span: 24 }}
          xl={{ offset: 4, span: 8 }}
        >
          <ProfileInfoAvatar />
        </Col>
        <Col
          className="gutter-row"
          xs={{ offset: 0, span: 24 }}
          xl={{ offset: 0, span: 8 }}
        >
          <ProfileInfoForm />
        </Col>
      </Row>
    </div>
  );
}
