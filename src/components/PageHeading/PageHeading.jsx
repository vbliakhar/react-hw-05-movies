import React from "react";
import Navigation from "../../components/Navigation/Navigation";

const PageHeading = ({ text }) => {
  return (
    <>
      <Navigation />
      <h1>{text}</h1>
    </>
  );
};

export default PageHeading;
