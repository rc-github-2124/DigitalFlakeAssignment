import React from "react";
import { Button, Container } from "react-bootstrap";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";

import catarrow from "../../assets/catarrow1.png";
import Form from "react-bootstrap/Form";

const AddProduct = () => {
    return (
        <>
            <Container>
                <Row>
                    <Col lg={12}>
                        <div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "20px",
                                }}
                            >
                                <Image
                                    style={{
                                        width: "24px",
                                        height: "24px",
                                        marginTop: "4px",
                                    }}
                                    src={catarrow}
                                ></Image>
                                <h3>Add Product</h3>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "flex-start",
                                    gap: "40px",
                                }}
                            >
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label
                                        style={{
                                            width: "171px",
                                            height: "30px",
                                            fontFamily: "Poppins",
                                            fontStyle: "normal",
                                            fontWeight: 400,
                                            fontSize: "20px",
                                            lineHeight: "30px",
                                            color: "rgb(0 0 0)",
                                            flex: "0 0 auto",
                                            position: "relative",
                                            top: "25px",
                                            paddingLeft: "7px",
                                            zIndex: 12,
                                            background: "white",
                                            left: "18px",
                                            paddingRight: "-24px",
                                        }}
                                    >
                                        Product Name
                                    </Form.Label>
                                    <Form.Control
                                        style={{
                                            position: "relative",
                                            width: "220px",
                                            height: "61px",
                                            zIndex: 9,

                                            border: "1px solid #9F9F9F",
                                            borderRadius: "10px",
                                        }}
                                        type="text"
                                    />
                                </Form.Group>
                                <div>
                                    <Form.Group
                                        className="mb-3"
                                        controlId="statusSelect"
                                        style={{
                                            position: "relative",
                                            width: "350px",
                                        }}
                                    >
                                        <Form.Label
                                            style={{
                                                width: "134px",
                                                height: "30px",
                                                fontFamily: "Poppins",
                                                fontStyle: "normal",
                                                fontWeight: 400,
                                                fontSize: "20px",
                                                lineHeight: "30px",
                                                color: "rgb(0, 0, 0)",
                                                flex: "0 0 auto",
                                                position: "relative",
                                                top: "25px",
                                                left: "114px",
                                                zIndex: 12,
                                                background: "white"
                                            }}
                                        >
                                            SubCategory
                                        </Form.Label>
                                        <Form.Select
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                height: "61px",
                                                zIndex: 9,
                                                border: "1px solid #9F9F9F",
                                                borderRadius: "10px",
                                                paddingLeft: "10px",
                                                fontFamily: "Poppins",
                                                fontStyle: "normal",
                                                fontWeight: 400,
                                                fontSize: "16px",
                                                lineHeight: "24px",
                                                position: "relative",
                                            }}
                                        >
                                            <option value="Active">Existing Category 1</option>
                                            <option value="Inactive">Existing Category 2x</option>
                                        </Form.Select>
                                   
                                    
                                        <Form.Label
                                            style={{
                                                width: "106px",
                                                height: "30px",
                                                fontFamily: "Poppins",
                                                fontStyle: "normal",
                                                fontWeight: 400,
                                                fontSize: "20px",
                                                lineHeight: "30px",
                                                color: "rgb(0 0 0)",
                                                flex: "0 0 auto",
                                                position: "relative",
                                                top: "25px",
                                                paddingLeft: "7px",
                                                zIndex: 12,
                                                background: "white",
                                                left: "18px",
                                                paddingRight: "-24px",
                                            }}
                                        >
                                            Category
                                        </Form.Label>
                                        <Form.Control
                                            style={{
                                                position: "relative",
                                                width: "220px",
                                                height: "61px",
                                                zIndex: 9,

                                                border: "1px solid #9F9F9F",
                                                borderRadius: "10px",
                                            }}
                                            type="text"
                                        />
                                   </Form.Group>
                                </div>




                            </div>
                        </div>
                    </Col>
                </Row>
                <div
                    style={{
                        marginTop: "340px",
                        float: "right",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "row",
                        gap: "31px",
                    }}
                >
                    <button
                        style={{
                            borderRadius: "25px",
                            width: "159px",
                            height: "52px",
                            backgroundColor: "#FFFFFF",
                            border: "1px  solid #9F9F9F",
                        }}
                        variant="outlined"
                    >
                        Cancel
                    </button>
                    <button
                        style={{
                            borderRadius: "25px",
                            width: "159px",
                            height: "52px",
                            backgroundColor: "#662671",
                            border: "1px  solid #9F9F9F",
                            color: "white",
                        }}
                        variant="outlined"
                    >
                        Save
                    </button>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    marginTop: '10px'
                }}>




                </div>
            </Container>
        </>
    );
};

export default AddProduct;
