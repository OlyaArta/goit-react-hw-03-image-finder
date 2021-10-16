import Loader from "react-loader-spinner";
import React from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class Spinner extends React.Component {
  //other logic
  render() {
    return (
      <Loader
        type="TailSpin"
        color="#00BFFF"
        height={80}
        width={80}
        timeout={3000} //3 secs
      />
    );
  }
}
