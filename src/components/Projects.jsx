import { useEffect, useState } from "react";
import { fetchContent } from "../services/api";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const Projects = () => {
  const [content, setContent] = useState([]);
  const [projectImages, setProjectImages] = useState({}); // Store image URLs

  useEffect(() => {
    fetchContent("node/project").then((data) => setContent(data.data));
  }, []);

  useEffect(() => {
    content.map((item) => {
      const imageRelationship = item.relationships.field_screenshot;

      if (imageRelationship) {
        // Fetch the image data from the related link
        fetch(imageRelationship.links.related.href)
          .then((response) => response.json())
          .then((imageData) => {
            const imageUrl = `https://localhost:63839/${imageData.data.attributes.uri.url}`;
            setProjectImages((prevState) => ({
              ...prevState,
              [item.id]: imageUrl, // Store image URL with project ID as key
            }));
          })
          .catch((imgError) =>
            console.error(
              `Error fetching image for project ${item.id}:`,
              imgError
            )
          );
      }
    });
  }, [content]);

  return (
    <div>
      <div className="d-flex justify-content-center my-5">
        <h1>Projects</h1>
      </div>
      <Container fluid>
        <Row xs={2} md={3} lg={4} className="g-3">
          {content ? (
            content.map((item) => (
              <Col className="mt-5" key={item.id}>
                <Card className="h-100" bg="dark" text="light" border="muted">
                  <div>
                    {projectImages[item.id] ? (
                      <Card.Img
                        variant="top"
                        src={projectImages[item.id]}
                        alt={`Screenshot for ${item.attributes.title}`}
                        className="rounded h-50"
                        style={{
                          objectFit: "cover",
                          objectPosition: "top",
                          minHeight: "200px",
                          maxHeight: "200px",
                        }}
                      />
                    ) : (
                      <p>No screenshot available</p>
                    )}
                  </div>
                  <Card.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Card.Title>{item.attributes.title}</Card.Title>
                    <Button
                      href={`${item.attributes.field_github_link.uri}`}
                      size="lg"
                      variant="light"
                      className="w-30 mt-3"
                    >
                      <i className="bi bi-github"></i>{" "}
                      {item.attributes.field_github_link.title}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <div>No content available</div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Projects;
