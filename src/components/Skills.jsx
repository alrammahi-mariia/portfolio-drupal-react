import React, { useEffect, useState } from "react";
import { fetchContent } from "../services/api";

const Skills = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchContent("node/skill").then((data) => setContent(data.data));
  }, []);

  console.log(content);

  return (
    <div>
      <h1>Skills</h1>
      {content &&
        content.map((item) => {
          return (
            <div
              dangerouslySetInnerHTML={{
                __html: item.attributes.body.value,
              }}
            />
          );
        })}
    </div>
  );
};

export default Skills;
