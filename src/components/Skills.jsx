import { useEffect, useState } from "react";
import { fetchContent } from "../services/api";
import { Container, ProgressBar } from "react-bootstrap";

const Skills = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchContent("node/skill").then((data) => setContent(data.data));
  }, []);

  console.log(content);

  return (
    <div>
      <div className="d-flex justify-content-center my-5">
        <h1>Skills</h1>
      </div>
      <Container className="w-50">
        {content &&
          content.map((item) => {
            return (
              <>
                <ProgressBar now={item.attributes.field_level} animated />
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.attributes.body.value,
                  }}
                />
              </>
            );
          })}
      </Container>
    </div>
  );
};

export default Skills;
