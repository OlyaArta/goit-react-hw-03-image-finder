import React, { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

export default class Modal extends Component {
  static propTypes = {
    largeImage: PropTypes.string.isRequired,
    onClick: PropTypes.func,
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
      this.props.onClick();
    }
  };

  handleBackdropClose = (event) => {
    if (event.currentTarget === event.target) {
      this.props.onClick();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.handleBackdropClose}>
        <div className={s.Modal}>
          <img src={this.props.largeImage} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
