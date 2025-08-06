// src/components/UIcards.tsx
import MediaLoader from '../../utils/media-providers/media-loader.tsx';

function UIcards({ title, image1, image2, alt1, alt2, url1, className, customArrowIcon2 }) {
  return ( 
    <div className={`card-container ${className}`}>
      <div className={`image-container ${className}`}>
        <a href={url1} className={`ui-link ${className}`}>
          <MediaLoader
            type="image"
            src={image2}
            alt={alt1}
            className={`ui-image1 ${className}`}
          />
        </a>
      </div>

      <div className={`image-container2 ${className}-2`}>
        <a href={url1} className={`ui-link-3 ${className}`}>
          <MediaLoader
            type="image"
            src={image1}
            alt={alt2}
            className={`ui-image2 ${className}-2`}
          />
        </a>

        <h-name className={`image-title ${className}`}>
          <a href={url1} className={`ui-link-2 ${className}`}>
            <span className="title-text">{title}</span>
            {customArrowIcon2 && (
              <div
                className="svg-icon"
                dangerouslySetInnerHTML={{ __html: customArrowIcon2 }}
              />
            )}
          </a>
        </h-name>
      </div>
    </div>
  );
}

export default UIcards;
