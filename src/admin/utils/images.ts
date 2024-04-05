import { FormImage } from "../components/forms/media-form";

const splitImages = (
  images: FormImage[]
): { uploadImages: FormImage[]; existingImages: FormImage[] } => {
  const uploadImages: FormImage[] = [];
  const existingImages: FormImage[] = [];

  images.forEach((image) => {
    if (image.nativeFile) {
      uploadImages.push(image);
    } else {
      existingImages.push(image);
    }
  });

  return { uploadImages, existingImages };
};

export const prepareImages = async (images: FormImage[], client) => {
  const { uploadImages, existingImages } = splitImages(images);

  let uploadedImgs: FormImage[] = [];
  if (uploadImages.length > 0) {
    const files = uploadImages.map((i) => i.nativeFile);
    uploadedImgs = await client.admin.uploads
      .create(files)
      .then(({ uploads }) => uploads);
  }

  return [...existingImages, ...uploadedImgs];
};
