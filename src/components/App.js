import React from "react";
import PropTypes from "prop-types";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Searchbar from "./Searchbar/Searchbar.js";
import fetchImages from "./services/API";
// import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Spinner from "./Loader/Loader";

export default class App extends React.Component {
  static propTypes = {
    searchQuery: PropTypes.string,
  };

  state = {
    searchQuery: "",
    images: [],
    page: 1,
    showModal: false,
    loading: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleFormSubmit = (searchQuery) => {
    this.setState({ searchQuery });
  };

  render() {
    const { showModal, loading, images } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/* <ImageGallery img={images} /> */}
        {showModal && <Modal onClose={this.toggleModal} />}
        {loading && <Spinner />}
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}
