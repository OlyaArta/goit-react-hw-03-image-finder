import React from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import Searchbar from "./Searchbar/Searchbar.js";
import fetchImages from "./services/API";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Spinner from "./Loader/Loader";
import Button from "./Button/Button";

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
    alt: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.searchQuery;
    const nextSearch = this.state.searchQuery;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch || prevPage !== nextPage) {
      try {
        this.setState({ loading: true });
        const images = await fetchImages(nextSearch, nextPage);

        this.setState((prevState) => ({
          images: [...prevState.images, ...images],
        }));
      } catch (error) {
        this.setState({ error });
        toast.error(this.state.error.message, { theme: "colored" });
      } finally {
        if (prevState.images.length > 5) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      }
      this.setState({ loading: false });
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleFormSubmit = (searchQuery) => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.cleanState();
    this.setState({ searchQuery });
  };

  modalClick = (largeImageUrl, tags) => {
    this.setState({
      showModal: largeImageUrl,
      alt: tags,
    });
  };

  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  cleanState = () => {
    this.setState({
      searchQuery: "",
      images: [],
      page: 1,
      showModal: true,
      loading: false,
      alt: null,
    });
  };

  render() {
    const { showModal, loading, images, alt } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery img={images} onImgClick={this.modalClick} />
        {images.length > 1 && <Button onClick={this.loadMore} />}
        {showModal && (
          <Modal showModal={showModal} onClose={this.toggleModal} tags={alt} />
        )}
        {loading && <Spinner />}
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}
