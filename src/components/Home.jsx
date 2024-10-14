import { useEffect, useState } from "react";
import { fetchContent } from "../services/api";
import ParticlesBg from "particles-bg";
import { Button } from "react-bootstrap";

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
      <ParticlesBg type="circle" bg={true} />
      <div className="d-flex vh-100">
        <div className="align-self-center text-center text-light col-md-8 offset-md-2">
          <div className="mb-4">
            <h1 className="display-1 fw-bolder">
              {content.attributes.field_name}
            </h1>
          </div>
          <div className="my-4">
            <p className="lead">
              <p
                dangerouslySetInnerHTML={{
                  __html: content.attributes.field_description.value,
                }}
              />
            </p>
          </div>
          <div className="d-flex flex-column flex-sm-row justify-content-center gap-2 gap-sm-5">
            <div className="mb-2">
              <Button
                href={`${content.attributes.field_linkedin.uri}`}
                variant="light"
                size="lg"
              >
                <i className="bi bi-linkedin"></i>{" "}
                {content.attributes.field_linkedin.title}
              </Button>
            </div>
            <div>
              <Button
                href={`${content.attributes.field_github.uri}`}
                variant="dark"
                size="lg"
                className="w-100"
              >
                <i className="bi bi-github"></i>{" "}
                {content.attributes.field_github.title}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
