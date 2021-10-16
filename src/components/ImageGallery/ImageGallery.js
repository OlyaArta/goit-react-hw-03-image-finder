import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import s from "./ImageGallery.module.css";

const ImageGallery = ({ img, onImgClick }) => {
  return (
    <ul className={s.ImageGallery}>
      {img.map(({ id, webformatURL, largeImageURL, tags }) => (
        <ImageGalleryItem
          key={id}
          image={webformatURL}
          tags={tags}
          onImgClick={() => onImgClick(largeImageURL, tags)}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  img: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ),
  onImgClick: PropTypes.func,
};

export default ImageGallery;
