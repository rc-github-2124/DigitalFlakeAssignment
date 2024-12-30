import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import catarrow from "../../assets/catarrow1.png";
import borderrectangle from "../../assets/borderrectangle.png";
import uploadimage from "../../assets/uploadimage.png";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [image, setImage] = useState(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories whenever a category is selected
  useEffect(() => {
    if (!category) return;

    const fetchSubcategories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/subcategories?category=${category}`
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, [category]);

  // Handle image upload
  const handleImageUpload = (file) => {
    setImage(file);
  };

  // Handle form submission
  const handleSave = async () => {
    if (!productName || !category || !subcategory) {
      alert("Please fill in all fields.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("category", category);
    formData.append("subcategory", subcategory);

    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:8000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col lg={12}>
            <div>
              <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
                <Image
                  style={{ width: "24px", height: "24px", marginTop: "4px" }}
                  src={catarrow}
                />
                <h3>Add Product</h3>
              </div>
              <div style={{ display: "flex", flexDirection: "row", gap: "40px" }}>
                {/* Product Name Field */}
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Form.Group>

                {/* Category Select */}
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Subcategory Select */}
                <Form.Group className="mb-3">
                  <Form.Label>Subcategory</Form.Label>
                  <Form.Select
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                  >
                    <option value="">Select Subcategory</option>
                    {subcategories.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.subcategoryName}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
          </Col>
        </Row>

        {/* Image Upload */}
        <div style={{ display: "flex", flexDirection: "row", gap: "20px", marginTop: "10px" }}>
          <div>
            <Image style={{ width: "200px", height: "165px" }} src={borderrectangle} />
            <Image
              style={{
                width: "46.79px",
                height: "43px",
                position: "relative",
                top: "-90px",
              }}
              src={uploadimage}
            />
            <h5 style={{ fontSize: "10px", position: "relative", top: "-70px" }}>
              Upload Maximum allowed file size is 10MB
            </h5>
          </div>
          <input
            type="file"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: "340px", float: "right", display: "flex", gap: "31px" }}>
          <button
            style={{
              borderRadius: "25px",
              width: "159px",
              height: "52px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #9F9F9F",
            }}
            onClick={() => alert("Cancelled")}
          >
            Cancel
          </button>
          <button
            style={{
              borderRadius: "25px",
              width: "159px",
              height: "52px",
              backgroundColor: "#662671",
              border: "1px solid #9F9F9F",
              color: "white",
            }}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </Container>
    </>
  );
};

export default AddProduct;
