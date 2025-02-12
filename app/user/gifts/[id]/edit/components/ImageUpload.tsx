'use client';

import { srOnly } from '@/app/globalStyles';
import { ImageState } from '@/types/ImageState';
import { useId, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import styled from 'styled-components';

/* ---------------------------------- style --------------------------------- */
const ImageLabel = styled.label`
  width: 8rem;
  aspect-ratio: 1;
  position: relative;
  overflow: hidden;
`;

const PreviewImageBox = styled.div`
  width: 25%;
  aspect-ratio: 1;
  position: relative;
  @media (max-width: 480px) {
    width: 35%;
  }
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.9375rem;
`;

const ImageInput = styled.input`
  ${srOnly}
`;

const DeleteButton = styled.button`
  position: absolute;
  top: -0.8rem;
  right: -0.8rem;
  background-color: var(--main);
  color: var(--white);
  border-radius: 50%;
  width: 2rem;
  aspect-ratio: 1;
  cursor: pointer;
`;

const NoImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed var(--deepgray);
  box-sizing: border-box;
  width: 25%;
  aspect-ratio: 1;
  border-radius: 0.9375rem;
  background-color: var(--lightgray);
  font-size: 2.5rem;
  cursor: pointer;
  @media (max-width: 480px) {
    width: 35%;
  }
`;

/* ---------------------------------- type ---------------------------------- */
type ImageUploadProps = {
  imageState: ImageState;
  setImageState: React.Dispatch<React.SetStateAction<ImageState>>;
  onDeleteImage?: () => Promise<void>;
};

/* -------------------------------- component ------------------------------- */

const ImageUpload = ({
  imageState,
  setImageState,
  onDeleteImage,
}: ImageUploadProps) => {
  const id = useId();
  const [isFirstDelete, setIsFirstDelete] = useState(true);

  const setImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const imageFile = e.target.files[0];

    if (imageState.imageSrc) {
      URL.revokeObjectURL(imageState.imageSrc);
    }

    const imageSrc = URL.createObjectURL(imageFile);

    setImageState({
      imageFile: imageFile,
      imageSrc: imageSrc,
      imageUrl: '',
    });

    setIsFirstDelete(false);
    e.target.value = '';
  };

  const handleDeleteImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!imageState.imageUrl) {
      setImageState({ imageFile: null, imageSrc: '', imageUrl: '' });
      return;
    }

    if (isFirstDelete && onDeleteImage) {
      await onDeleteImage();
      setIsFirstDelete(false);
    }

    setImageState({ imageFile: null, imageSrc: '', imageUrl: '' });
  };

  return (
    <ImageLabel htmlFor={id}>
      {imageState.imageSrc ? (
        <PreviewImageBox>
          <PreviewImage src={imageState.imageSrc} alt="giftImage" />
          <DeleteButton type="button" onClick={handleDeleteImage}>
            x
          </DeleteButton>
        </PreviewImageBox>
      ) : (
        <>
          <NoImageBox>
            <FiPlus style={{ color: 'var(--disabled)' }} />
          </NoImageBox>
          <ImageInput
            onChange={setImagePreview}
            type="file"
            id={id}
            accept="image/*"
          />
        </>
      )}
    </ImageLabel>
  );
};

export default ImageUpload;
