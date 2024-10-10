import React, { useEffect, useState } from "react";
import { fetchContent } from "../services/api";

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
      <h1>Projects</h1>
      {content ? (
        content.map((item) => (
          <div key={item.id}>
            <h3>{item.attributes.title}</h3>
            <a href={item.attributes.field_github_link.uri}>
              {item.attributes.field_github_link.title}
            </a>
            {/* Display image if available */}
            {projectImages[item.id] ? (
              <img
                src={projectImages[item.id]}
                alt={`Screenshot for ${item.attributes.title}`}
                width="400"
              />
            ) : (
              <p>No screenshot available</p>
            )}
          </div>
        ))
      ) : (
        <div>No content available</div>
      )}
    </div>
  );
};

export default Projects;
