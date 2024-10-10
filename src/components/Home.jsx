import React, { useEffect, useState } from "react";
import { fetchContent } from "../services/api";
import ParticlesBg from "particles-bg";

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
      <header id="home">
        <ParticlesBg type="circle" bg={true} />

        <nav id="nav-wrap">
          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home">
                Home
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#about">
                About
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#resume">
                Resume
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#portfolio">
                Works
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div className="row banner">
          <div className="banner-text">
            <h1 className="responsive-headline">Headline</h1>
            <h3>text</h3>
            <hr />
            <ul className="social">
              <a href="" className="button btn project-btn">
                <i className="fa fa-book"></i>Project
              </a>
              <a href="" className="button btn github-btn">
                <i className="fa fa-github"></i>Github
              </a>
            </ul>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
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
