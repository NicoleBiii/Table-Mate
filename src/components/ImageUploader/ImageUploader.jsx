import "./ImageUploader.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { uploadMenuItemImage } from "../../api/menuApi"; 

const ImageUploader = ({ currentImage, onUploadSuccess }) => {
    const { t, i18n } = useTranslation();
    const [isUploading, setIsUploading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState('');
  
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

    // handle file
    const handleFile = async (file) => {
        if (!file) {
          setError(t("no_file_selected"));
          return;
        }
    
        console.log("start to upload image:", file.name);
        
        if (!file.type.startsWith('image/')) {
          setError(t("invalid_file_type"));
          return;
        }
    
        if (file.size > 5 * 1024 * 1024) {
          setError(t("file_too_large"));
          return;
        }
    
        setIsUploading(true);
        setError('');
    
        try {
          const imageUrl = await uploadMenuItemImage(file);
          const fullImageUrl = `${API_BASE_URL}${imageUrl}`;
          console.log("upload successful", imageUrl);
          onUploadSuccess(fullImageUrl);
        } catch (err) {
          console.error("upload error:", err);
          setError(err.message || t("upload_failed"));
        } finally {
          setIsUploading(false);
        }
      };
  
    // handle drag
    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
  
    const handleDragIn = (e) => {
      handleDrag(e);
      if (e.dataTransfer.items?.length > 0) {
        setIsDragging(true);
      }
    };
  
    const handleDragOut = (e) => {
      handleDrag(e);
      setIsDragging(false);
    };
  
    const handleDrop = (e) => {
      handleDrag(e);
      setIsDragging(false);
      
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    };
  
    return (
        <div className="image-uploader">
        <div className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragEnter={handleDragIn}
          onDragLeave={handleDragOut}
          onDragOver={handleDrag} 
          onDrop={handleDrop} 
        >
          {currentImage ? (
            <div className="current-image-wrapper">
              <img 
                src={`${currentImage}?t=${Date.now()}`}  
                alt={t("menu_management.current_image")} 
            />
              <div className="hover-overlay">
                <span>{isDragging ? t("menu_management.drop_to_upload") : t("menu_management.update_prompt")}</span>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              {isDragging ? (
                t("menu_management.drop_to_upload")
              ) : (
                <>
                  <span>{t("menu_management.drag_prompt")}</span>
                  <label className="browse-button" htmlFor="file-input">
                    {t("menu_management.browse_button")}
                  </label>
                </>
              )}
            </div>
          )}
  
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
            disabled={isUploading}
          />
        </div>
  
        {error && <div className="error-message">{error}</div>}
        {isUploading && <div className="upload-status">{t("menu_management.uploading")}</div>}
      </div>
    );
  };

export default ImageUploader
