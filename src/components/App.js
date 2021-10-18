import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Searchbar from "./Searchbar/Searchbar.js";
import fetchImages from "./services/API";
import ImageGallery from "./ImageGallery/ImageGallery";
import Modal from "./Modal/Modal";
import Spinner from "./Loader/Loader";
import Button from "./Button/Button";

export default class App extends React.Component {
  state = {
    searchQuery: "",
    images: [],
    page: 1,
    showModal: false,
    loading: false,
    largeImage: "",
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

  handleFormSubmit = (searchQuery) => {
    this.cleanPage();
    this.setState({ searchQuery });
  };

  cleanPage = () => {
    this.setState({
      searchQuery: "",
      page: 1,
      images: [],
      showModal: false,
    });
  };

  loadMore = () => {
    this.setState((prevState) => ({
      page: prevState.page + 1,
    }));
  };

  // openModal = (largeImageUrl, tags) => {
  //   this.setState({ alt: tags, showModal: true });
  // };

  // closeModal = () => {
  //   this.setState({ showModal: false });
  // };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  clickImages = (e) => {
    const modalImg = e.currentTarget.alt;
    this.setState({ showModal: true, largeImage: modalImg });
  };

  render() {
    const { showModal, loading, images, largeImage } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && (
          <ImageGallery img={images} clickImages={this.clickImages} />
        )}
        {images.length > 1 && <Button onClick={this.loadMore} />}
        {showModal && (
          <Modal onClick={this.toggleModal} largeImage={largeImage} />
        )}
        {loading && <Spinner />}
        <ToastContainer autoClose={2500} />
      </div>
    );
  }
}
