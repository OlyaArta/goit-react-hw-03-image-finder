import React, { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  static propTypes = {
    tags: PropTypes.string,
    onClose: PropTypes.func,
    showModal: PropTypes.string,
  };

  componentDidMount() {
    // console.log("sds");
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    // console.log("saas");
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  handleBackdropClose = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClose}>
        <div className={s.Modal}>
          <img src={this.props.showModal} alt={this.props.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
