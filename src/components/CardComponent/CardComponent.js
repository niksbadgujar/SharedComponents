// @ts-nocheck
import {
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import styled from "styled-components";

const CardComponent = (props) => {
  const {
    title = "",
    accountNumber = "",
    accountHolderName = "",
    onButton1Click,
    onButton2Click,
  } = props;

  const StyledButton = styled.button`
    width: 5rem;
    background: white;
    color: black;
    border-radius: 0px;
    border-color: black;
    padding: 2px;
    cursor: pointer;
    outline: none;
    border: 1px solid black;
  `;

  return (
    <>
      <div className="cards-section m-1">
        <Col md={6} sm={6} xs={12}>
          <Card>
            <CardBody className="p-1">
              <Row>
                <Col md={6} xs={12} className="border-right">
                  <Col md={12} xs={12} className="text-left mb-2">
                    <CardTitle>{title}</CardTitle>
                    <CardSubtitle>
                      {accountNumber} {accountHolderName}
                    </CardSubtitle>
                  </Col>
                  <Row>
                    <Col
                      md={{ size: 2, offset: 1 }}
                      xs={{ size: 2, offset: 1 }}
                      className="border-left pl-4"
                    >
                      <Row>
                        <CardText>{"XXXXX"}</CardText>
                      </Row>
                      <Row>
                        <CardText>{"12345"}</CardText>
                      </Row>
                    </Col>

                    <Col
                      md={{ size: 2, offset: 1 }}
                      xs={{ size: 2, offset: 1 }}
                      className="border-left pl-4"
                    >
                      <Row>
                        <CardText>{"XXXX"}</CardText>
                      </Row>
                      <Row>
                        <CardText>{"XXXX1"}</CardText>
                      </Row>
                    </Col>

                    <Col
                      md={{ size: 3, offset: 1 }}
                      xs={{ size: 3, offset: 1 }}
                      className="border-left pl-4"
                    >
                      <Row>
                        <CardText>{"XXXXX5"}</CardText>
                      </Row>
                      <Row>
                        <CardText>{"@ XXXX"}</CardText>
                      </Row>
                    </Col>
                  </Row>
                </Col>

                <Col md={6} xs={12}>
                  <Row className="mt-3">
                    <Col md={2} xs={2} className="border-right ml-1">
                      <CardImg width="50%" src={"cardAccount.png"} />
                    </Col>
                    <Col md={2} xs={2} className="ml-1">
                      <CardImg src={"cardDetails.png"} />
                    </Col>

                    <Col md={3} xs={3}>
                      <StyledButton type="button" onClick={onButton1Click}>
                        Button1
                      </StyledButton>
                    </Col>

                    <Col md={3} xs={3}>
                      <StyledButton onClick={onButton2Click}>
                        Button 2
                      </StyledButton>
                    </Col>
                  </Row>

                  <Row className="mt-5">
                    <Col className="text-right">
                      <CardSubtitle>{"XXXXXX !"}</CardSubtitle>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </div>
    </>
  );
};

export default CardComponent;
