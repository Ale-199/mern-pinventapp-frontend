import React from "react";
import loaderImage from "../../assets/loader.gif";
import ReactDOM from "react-dom";
import "./Loader.scss";

export default function Loader() {
  //This is the full screen loader
  return ReactDOM.createPortal(
    <div className="wrapper">
      <div className="loader">
        <img src={loaderImage} alt="loading...." />
      </div>
    </div>,
    document.getElementById("loader")
  );
}

export const SpinnerImg = () => {
  return (
    <div className="--center-all">
      <img src={loaderImage} alt="Loading...." />
    </div>
  );
};
