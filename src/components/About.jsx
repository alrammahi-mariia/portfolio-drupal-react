import React, { useEffect, useState } from "react";
import { fetchContent } from "../services/api";

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
      <h1>About</h1>
      <div>
        {imageUrl ? (
          <img src={imageUrl} alt="Profile" width={460} height={460} />
        ) : (
          <p>No image available</p>
        )}
      </div>
      {content && (
        <>
          <div
            dangerouslySetInnerHTML={{ __html: content.attributes.body.value }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: content.attributes.field_education.value,
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: content.attributes.field_experience.value,
            }}
          />
        </>
      )}
    </div>
  );
};

export default About;
