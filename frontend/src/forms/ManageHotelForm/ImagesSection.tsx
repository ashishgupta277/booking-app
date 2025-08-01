import { useFormContext } from "react-hook-form";
import type { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    // setValue,
  } = useFormContext<HotelFormData>();

   const existingImageUrls = watch("imageUrls") || [];
   const imageFiles = watch("imageFiles");
  
  // Calculate total images
  const totalImages = existingImageUrls.length + (imageFiles ? imageFiles.length : 0);
  const maxImages = 6;
  const remainingSlots = maxImages - totalImages;

  // const handleDelete = (
  //   event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   imageUrl: string
  // ) => {
  //   event.preventDefault();
  //   setValue(
  //     "imageUrls",
  //     existingImageUrls.filter((url) => url !== imageUrl)
  //   );
  // };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">Hotel Images</h2>
          <p className="text-sm text-gray-600 mt-1">Upload high-quality images to showcase your hotel (max 6 images)</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">{totalImages}</div>
          <div className="text-sm text-gray-500">of {maxImages} images</div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Image Count Progress */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Upload Progress</span>
            <span className="text-sm text-gray-500">{remainingSlots} slots remaining</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(totalImages / maxImages) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Existing Images */}
        {existingImageUrls && existingImageUrls.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Current Images ({existingImageUrls.length})
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {existingImageUrls.map((url, index) => (
                <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <img 
                    src={url} 
                    alt={`Hotel image ${index + 1}`}
                    className="w-full h-full object-cover" 
                  />
                  {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
                    <button
                      onClick={(event) => handleDelete(event, url)}
                      className="opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div> */}
                  <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Section */}
        {remainingSlots > 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors duration-200">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload More Images</h3>
                <p className="text-sm text-gray-600 mb-4">
                  You can upload up to {remainingSlots} more image{remainingSlots !== 1 ? 's' : ''}
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                  {...register("imageFiles", {
                    validate: (imageFiles) => {
                      const totalLength =
                        (imageFiles ? imageFiles.length : 0) + existingImageUrls.length;

                      if (totalLength === 0) {
                        return "At least one image should be added";
                      }

                      if (totalLength > 6) {
                        return "Total number of images cannot be more than 6";
                      }

                      return true;
                    },
                  })}
                />
                <label 
                  htmlFor="image-upload"
                  className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Choose Files
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="border-2 border-dashed border-green-300 bg-green-50 rounded-lg p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-2">Maximum Images Reached</h3>
                <p className="text-sm text-green-600">
                  You have uploaded the maximum number of images (6)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errors.imageFiles && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700 text-sm font-medium">
                {errors.imageFiles.message}
              </span>
            </div>
          </div>
        )}

        {/* Guidelines */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm text-blue-800 font-medium mb-1">Image Guidelines</p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Upload high-quality images (minimum 800x600 pixels)</li>
                <li>• Supported formats: JPG, PNG, WebP</li>
                <li>• Maximum 6 images total</li>
                <li>• First image will be used as the main display image</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesSection;