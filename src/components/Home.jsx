import React, { useEffect, useState } from "react";
import { fetchContent } from "../services/api";

const Home = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    fetchContent(
      "node/profile?include=field_profile_picture&fields[file--file]=uri,url"
    )
      .then((data) => {
        console.log("Fetched data:", data);
        const profile = data.data[0];
        setContent(profile);

        const imageRelationship = profile.relationships.field_profile_picture;

        if (imageRelationship) {
          // Fetch the image URL from the related link
          fetch(imageRelationship.links.related.href)
            .then((response) => response.json())
            .then((imageData) => {
              const imageFile = `https://localhost:63839/${imageData.data.attributes.uri.url}`;
              // console.log(imageFile);
              setImageUrl(imageFile);
            })
            .catch((imgError) =>
              console.error("Error fetching image:", imgError)
            );
        }

        setLoading(false);
      })

      .catch((error) => {
        console.error("Error fetching content:", error); // Log any errors
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading content: {error.message}</div>;
  }

  return (
    <div>
      <h1>Home</h1>
      {content && content.attributes ? (
        <div>
          <div>
            {imageUrl ? (
              <img src={imageUrl} alt="Profile" width={460} height={460} />
            ) : (
              <p>No image available</p>
            )}
          </div>

          <div>Name: {content.attributes.title}</div>
          <div>Job title: {content.attributes.field_job_title}</div>
          <ul>
            <li>
              <a href="">{content.attributes.field_github.title}</a>
            </li>
            <li>
              <a href="">{content.attributes.field_linkedin.title}</a>
            </li>
          </ul>
        </div>
      ) : (
        <div>No content available</div>
      )}
    </div>
  );
};

export default Home;
