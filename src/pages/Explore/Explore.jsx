import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import Project from "../../components/Project/Project";
import PageHeader from "../../components/PageHeader/PageHeader";
import "./Explore.css";

const Explore = () => {
  const [show, setShow] = useState("trending");
  console.log("09",setShow)

  return (
    <Layout>
      <PageHeader text="Category" />
      <div className="topic-info">
        <div className="tag-container">
          <div className="tag-name">Javascript</div>
        </div>
        <div className="topic-links">
          <p>
            {" "}
            316 <span>Followers</span>
          </p>
          <div className="topic-links-space"></div>
          <button className="follow-btn">Follow</button>
        </div>
        <div className="topic-projects">
          <p
            className={show === "trending" ? "selected" : ""}
            onClick={() => setShow("trending")}
          >
            Trending Projects
          </p>
          <div className="topic-projects-space"></div>
          <p
            className={show === "new" ? "selected" : ""}
            onClick={() => setShow("new")}
          >
            New Projects
          </p>
        </div>
      </div>
      <div className="topic-project-feed">
        <>
          {[1, 2].map((item) => (
            <Project />
          ))}
        </>
      </div>
    </Layout>
  );
};

export default Explore;
