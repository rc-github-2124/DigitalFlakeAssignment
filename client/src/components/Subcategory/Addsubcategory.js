import React, { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col, Image } from "react-bootstrap";
import axios from "axios";
import SubImage from "./SubImage"; // Assuming this handles image upload for the subcategory
import catarrow from "../../assets/catarrow1.png";
import borderrectangle from "../../assets/borderrectangle.png";
import uploadimage from "../../assets/uploadimage.png";

// This component handles the logic for adding a subcategory
const Addsubcategory = () => {
  const [subcategoryName, setSubcategoryName] = useState("");
  const [category, setCategory] = useState("Existing Category 1"); // Default value for the category
  const [categories, setCategories] = useState([]); // To hold available categories
  const [image, setImage] = useState(null); // Image upload state (if applicable)
  
  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/categories");
        setCategories(response.data); // Populate categories from the backend
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle subcategory name change
  const handleSubcategoryChange = (e) => {
    setSubcategoryName(e.target.value);
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Handle image upload
  const handleImageUpload = (file) => {
    setImage(file);
  };

  // Handle form submission for adding a subcategory
  const handleSave = async () => {
    if (!subcategoryName || !category) {
      alert("Please fill in all fields.");
      return;
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("subcategoryName", subcategoryName);
    formData.append("category", category);

    if (image) {
      formData.append("image", image); // Add image if it's selected
    }

    try {
      // Send a request to the backend to add or update the subcategory for the selected category
      const response = await axios.put(
        `http://localhost:8000/api/subcategories/${category}`, // Assuming category ID is being used to update subcategories
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure that the image is sent correctly
          },
        }
      );
      alert("Subcategory added successfully");
    } catch (error) {
      console.error("Error adding subcategory:", error);
      alert("Failed to add subcategory");
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col lg={12}>
            <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
              <Image style={{ width: "24px", height: "24px", marginTop: "4px" }} src={catarrow} />
              <h3>Add Sub Category</h3>
            </div>

            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", gap: "40px" }}>
              {/* Subcategory Name Field */}
              <Form.Group className="mb-3" controlId="subcategoryName">
                <Form.Label style={{ fontSize: "20px", fontFamily: "Poppins", marginLeft: "18px" }}>
                  Sub Category
                </Form.Label>
                <Form.Control
                  style={{
                    width: "220px",
                    height: "61px",
                    border: "1px solid #9F9F9F",
                    borderRadius: "10px",
                  }}
                  type="text"
                  value={subcategoryName}
                  onChange={handleSubcategoryChange}
                />
              </Form.Group>

              {/* Category Select Field */}
              <Form.Group className="mb-3" controlId="categorySelect" style={{ width: "350px" }}>
                <Form.Label style={{ fontSize: "20px", fontFamily: "Poppins", left: "114px" }}>
                  Category
                </Form.Label>
                <Form.Select
                  style={{
                    width: "100%",
                    height: "61px",
                    border: "1px solid #9F9F9F",
                    borderRadius: "10px",
                    paddingLeft: "10px",
                    fontFamily: "Poppins",
                    fontSize: "16px",
                  }}
                  value={category}
                  onChange={handleCategoryChange}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </Col>
        </Row>

        {/* Action Buttons */}
        <div style={{ marginTop: "340px", float: "right", display: "flex", justifyContent: "center", gap: "31px" }}>
          <button
            style={{
              borderRadius: "25px",
              width: "159px",
              height: "52px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #9F9F9F",
            }}
            onClick={() => alert("Cancel")}
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

        {/* Image Upload */}
        <div style={{ display: "flex", flexDirection: "row", gap: "20px", marginTop: "10px" }}>
          <SubImage onImageUpload={handleImageUpload} />
          <div style={{ width: "200px", height: "165px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
            <Image style={{ width: "200px", height: "200px" }} src={borderrectangle} />
            <Image style={{ width: "46.79px", height: "43px", position: "relative", top: "-90px" }} src={uploadimage} />
            <h5 style={{ fontFamily: "'Poppins'", fontSize: "10px", lineHeight: "15px", textAlign: "center", color: "#000000", top: "-68px" }}>
              Upload Maximum allowed file size is 10MB
            </h5>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Addsubcategory;
