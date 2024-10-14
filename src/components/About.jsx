import { useEffect, useState } from "react";
import { fetchContent } from "../services/api";
import { Col, Container, Image, Row } from "react-bootstrap";

const About = () => {
  const [content, setContent] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetchContent("node/about").then((data) => {
      setContent(data.data[0]);

      const imageRelationship = content.relationships.field_profile;

      if (imageRelationship) {
        // Fetch the image data from the related link
        fetch(imageRelationship.links.related.href)
          .then((response) => response.json())
          .then((imageData) => {
            const imageFile = `https://localhost:63839/${imageData.data.attributes.uri.url}`;
            setImageUrl(imageFile);
          })
          .catch((imgError) =>
            console.error("Error fetching image:", imgError)
          );
      }
    }),
      [];
  });

  return (
    <div>
      <div className="d-flex justify-content-center my-5">
        <h1>About me</h1>
      </div>
      <Container className="d-flex">
        <Row className="m-auto mt-2 align-items-center justify-content-center">
          <Col className="d-flex justify-content-center mb-2">
            <div>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Profile"
                  roundedCircle
                  className="img-fluid"
                  style={{ maxHeight: "20em" }}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
          </Col>
          <Col className="d-flex justify-content-center">
            {content && (
              <div
                className="lead text-center"
                dangerouslySetInnerHTML={{
                  __html: content.attributes.body.value,
                }}
              />
            )}
          </Col>
        </Row>
      </Container>
      <Container fluid className="d-flex mt-5 justify-content-center">
        <Row className="text-center">
          {content && (
            <>
              <Col className="border rounded p-5 mx-2 my-5">
                <h1>
                  <i className="bi bi-patch-check"></i>
                </h1>
                <div
                  className="mt-3"
                  dangerouslySetInnerHTML={{
                    __html: content.attributes.field_education.value,
                  }}
                />
              </Col>
              <Col className="border rounded p-5 mx-2 my-5">
                <h1>
                  <i className="bi bi-person-workspace"></i>
                </h1>
                <div
                  className="mt-3"
                  dangerouslySetInnerHTML={{
                    __html: content.attributes.field_experience.value,
                  }}
                />
              </Col>
            </>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default About;
