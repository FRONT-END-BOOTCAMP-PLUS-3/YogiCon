import { useState, useEffect } from 'react';

const useValidImageUrl = (
  imageUrl: string,
  fallbackUrl: string = '/gifticon.jpg'
) => {
  const [validImageUrl, setValidImageUrl] = useState(fallbackUrl);

  useEffect(() => {
    if (!imageUrl) {
      setValidImageUrl(fallbackUrl);
      return;
    }

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => setValidImageUrl(imageUrl); // 이미지 로드 성공 시 설정
    img.onerror = () => setValidImageUrl(fallbackUrl); // 이미지 로드 실패 시 기본 이미지로 변경
  }, [imageUrl, fallbackUrl]);

  return validImageUrl;
};

export default useValidImageUrl;
