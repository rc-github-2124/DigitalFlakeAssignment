import React from "react";
import { Button, Container } from "react-bootstrap";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Image } from "react-bootstrap";
import Imageuploader from "./Imageuploader";
import catarrow from '../../assets/catarrow1.png'
import Form from "react-bootstrap/Form";
import uploadimage from '../../assets/uploadimage.png';
import borderrectangle from '../../assets/borderrectangle.png';
import { useEffect,useState } from "react";
import axios from "axios";
import { useParams } from "react-router";

const Editcategory = ({categoryId}) => {
    const { id } = useParams(); 
    const [categoryName, setCategoryName] = useState('');
    const [image, setImage] = useState('');
    const [status, setStatus] = useState('');
    const [ids, setId] = useState('');

  const handleImageUpload = (file) => {
    setImage(file); 
  };

  // Handle delete
  useEffect(() => {
    axios.get(`http://localhost:8000/api/categories/${id}`)
        .then((response) => {
            const { categoryName, image, status, id } = response.data;
            setCategoryName(categoryName);
            setImage(image);
            setStatus(status);
            setId(id);
        })
        .catch((error) => {
            console.error("Error fetching category data:", error);
        });
}, [categoryId]);
    

    const handleSave = async () => {
        const updatedCategory = {
            categoryName,
            image, 
            status
        };

        try {
            const response = await axios.put(`http://localhost:8000/api/categories/${id}`, updatedCategory);
            if (response.data) {
                alert("Category updated successfully");
            }
        } catch (error) {
            console.error("Error updating category:", error);
            alert("Failed to update category");
        }
    };

    return (
        <>
            <Container>
            <Row>
                <Col lg={12}>
                    <div>
                        <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
                            <Image style={{ width: '24px', height: '24px', marginTop: '4px' }} src={catarrow}></Image>
                            <h3>Edit Category</h3>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", gap: '40px' }}>
                            <Form.Group className="mb-3" controlId="categoryName">
                                <Form.Label style={{
                                    fontFamily: "Poppins", fontWeight: 400, fontSize: "20px", color: "rgb(0 0 0)",
                                    position: "relative", top: "25px", paddingLeft: "7px", zIndex: 12, background: "white"
                                }}>Category Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    style={{
                                        position: "relative", width: "350px", height: "61px", border: "1px solid #9F9F9F", borderRadius: "10px"
                                    }}
                                />
                            </Form.Group>
                            <Imageuploader onImageUpload={handleImageUpload} image={image} />
                            <div style={{
                                width: '200px', height: '165px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                                alignItems: "center", textAlign: 'center'
                            }}>
                                <Image style={{
                                    width: "200px", height: "200px"
                                }} src={borderrectangle}></Image>
                                <Image style={{
                                    width: "46.79px", height: "43px", position: "relative", top: "-90px"
                                }} src={uploadimage}></Image>
                                <h5 style={{
                                    fontFamily: "'Poppins'", fontSize: "10px", color: "#000000", position: "relative", top: "-68px"
                                }}>Upload Maximum allowed file size is 10MB</h5>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <div>
                <Form.Group className="mb-3" controlId="statusSelect" style={{ width: "350px" }}>
                    <Form.Label style={{
                        fontFamily: "Poppins", fontWeight: 400, fontSize: "20px", color: "rgb(0, 0, 0)", position: "relative", top: "25px",
                        left: "114px", zIndex: 12, background: "white"
                    }}>Status</Form.Label>
                    <Form.Select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        style={{
                            width: "100%", height: "61px", border: "1px solid #9F9F9F", borderRadius: "10px", paddingLeft: "10px"
                        }}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </Form.Select>
                </Form.Group>
            </div>
            <div style={{
                marginTop: '340px', float: 'right', display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: '31px'
            }}>
                <button
                    onClick={() => alert("Cancel clicked")}
                    style={{
                        borderRadius: '25px', width: '159px', height: '52px', backgroundColor: '#FFFFFF', border: '1px solid #9F9F9F'
                    }}
                >
                    Cancel
                </button>
                <button
                    onClick={handleSave}
                    style={{
                        borderRadius: '25px', width: '159px', height: '52px', backgroundColor: '#662671', border: '1px solid #9F9F9F', color: 'white'
                    }}
                >
                    Save
                </button>
            </div>
        </Container>
        </>
    );
};

export default Editcategory;