import React, { useEffect, useState } from "react";
import { fetchContent } from "../services/api";

const Home = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContent("node/profile")
      .then((data) => {
        console.log("Fetched data:", data);
        const profile = data.data[0];
        setContent(profile);

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
          <div>{content.attributes.field_name}</div>
          <ul>
            <li>
              <a href={`${content.attributes.field_github.uri}`}>
                {content.attributes.field_github.title}
              </a>
            </li>
            <li>
              <a href={`${content.attributes.field_linkedin.uri}`}>
                {content.attributes.field_linkedin.title}
              </a>
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
