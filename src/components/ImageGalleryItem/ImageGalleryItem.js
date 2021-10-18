import PropTypes from "prop-types";
import s from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  onClick,
}) {
  return (
    <li className={s.ImageGalleryItem}>
      <img
        src={webformatURL}
        alt={largeImageURL}
        className={s.ImageGalleryItemImage}
        onClick={onClick}
      />
    </li>
  );
}

// const ImageGalleryItem = ({ image, tags }) => {
//   return (
//     <li className={s.ImageGalleryItem}>
//       <img src={image} alt={tags} className={s.ImageGalleryItemImage} />
//     </li>
//   );
// };

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
