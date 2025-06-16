import React, { useState, useRef, useCallback } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSave, faUpload } from "@fortawesome/free-solid-svg-icons";

const ImageCropModal = ({ isOpen, onClose, onSave, currentImage }) => {
  const [src, setSrc] = useState(null);
  const [crop, setCrop] = useState({
    unit: "%",
    width: 90,
    height: 90,
    x: 5,
    y: 5,
    aspect: 1, // Square aspect ratio
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const fileInputRef = useRef(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  const getCroppedImg = useCallback((image, crop) => {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result);
      }, "image/jpeg");
    });
  }, []);

  const handleSave = useCallback(async () => {
    if (!completedCrop || !imgRef.current) {
      console.log("Cannot save: missing crop or image reference");
      return;
    }

    try {
      console.log("Starting image crop process...");
      const croppedImageUrl = await getCroppedImg(
        imgRef.current,
        completedCrop
      );
      console.log("Cropped image generated:", {
        length: croppedImageUrl ? croppedImageUrl.length : 0,
        isValidBase64:
          croppedImageUrl && croppedImageUrl.startsWith("data:image/"),
        preview: croppedImageUrl
          ? croppedImageUrl.substring(0, 50) + "..."
          : "No image",
      });

      onSave(croppedImageUrl);
      handleClose();
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  }, [completedCrop, getCroppedImg, onSave]);

  const handleClose = () => {
    setSrc(null);
    setCrop({
      unit: "%",
      width: 90,
      height: 90,
      x: 5,
      y: 5,
      aspect: 1,
    });
    setCompletedCrop(null);
    onClose();
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="w-full max-w-2xl glass-effect rounded-2xl border border-white/10 overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h3
            className="text-xl font-semibold text-white"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            Edit Profile Picture
          </h3>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors duration-150"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {!src ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                <FontAwesomeIcon
                  icon={faUpload}
                  className="text-3xl text-indigo-400"
                />
              </div>
              <h4
                className="text-lg font-semibold text-white mb-2"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Upload Profile Picture
              </h4>
              <p className="text-slate-400 text-sm mb-6">
                Choose an image to crop and set as your profile picture
              </p>
              <button
                onClick={handleUploadClick}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-colors duration-150 font-medium"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                <FontAwesomeIcon icon={faUpload} className="mr-2" />
                Choose Image
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onSelectFile}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-center">
                <ReactCrop
                  crop={crop}
                  onChange={(_, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={1}
                  circularCrop
                >
                  <img
                    ref={imgRef}
                    alt="Crop me"
                    src={src}
                    style={{ maxHeight: "400px", maxWidth: "100%" }}
                    onLoad={onImageLoad}
                  />
                </ReactCrop>
              </div>
              <div className="text-center">
                <p className="text-slate-400 text-sm mb-4">
                  Drag to reposition • Resize the circle to crop your image
                </p>
                <button
                  onClick={handleUploadClick}
                  className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors duration-150 mr-3"
                >
                  Choose Different Image
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {src && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-white/10">
            <button
              onClick={handleClose}
              className="px-6 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!completedCrop}
              className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-colors duration-150 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Save Picture
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCropModal;
