import React from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Searchbar from "./Searchbar/Searchbar.js";
import ImageGallery from "./ImageGallery/ImageGallery";

export default class App extends React.Component {
  static propTypes = {
    searchQuery: PropTypes.string,
  };

  state = {
    searchQuery: "",
    images: [],
    page: 1,
  };

  handleFormSubmit = (searchQuery) => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery img={this.state.images} />
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}
