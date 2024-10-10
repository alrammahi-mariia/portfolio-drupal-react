import React, { useEffect, useState } from "react";
import { fetchContent } from "../services/api";

const Projects = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchContent("node/project").then((data) => setContent(data.data));
  }, []);

  console.log(content);

  return (
    <div>
      <h1>Projects</h1>
      {content &&
        content.map((item) => {
          return (
            <>
              <div>{item.attributes.title}</div>
              <a href={`${item.attributes.field_github_link.uri}`}>
                {item.attributes.field_github_link.title}
              </a>
            </>
          );
        })}
    </div>
  );
};

export default Projects;
