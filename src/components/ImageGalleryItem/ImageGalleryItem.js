import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

const ImageGalleryItem = ({ image, tags }) => {
  return (
    <li className={s.ImageGalleryItem}>
      <img src={image} alt={tags} className={s.ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
