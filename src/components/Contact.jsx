import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getCsrfToken = async () => {
    try {
      const response = await axios.get("https://localhost:63839/session/token");
      return response.data;
    } catch (error) {
      console.error("Error fetching CSRF token:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const csrfToken = await getCsrfToken();
    if (!csrfToken) {
      console.error("CSRF token retrieval failed.");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:63839/jsonapi/node/message/",
        {
          data: {
            type: "node--message",
            attributes: {
              title: `${formData.name}`,
              field_email: `${formData.email}`,
              field_subject: `${formData.subject}`,
              field_message: {
                value: `${formData.message}`,
              },
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/vnd.api+json",
            "X-CSRF-Token": csrfToken,
          },
        }
      );

      console.log("Form submitted successfully:", response.data);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center my-5">
        <h1>Contact Form</h1>
      </div>
      <Container className="mt-2 w-50">
        <Row className="justify-content-center">
          <Col>
            <p className="lead text-center">
              Send me a message and I will get back to you as soon as possible!
            </p>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formSubject" className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formMessage" className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={4}
                  placeholder="Enter your message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;
