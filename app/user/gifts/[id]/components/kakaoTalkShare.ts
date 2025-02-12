type kakaoTalkShareProps = {
  productName: string;
  brand: string;
  dueDate: string;
  imageUrl: string;
};

export const kakaoTalkShare = ({
  productName,
  brand,
  dueDate,
  imageUrl,
}: kakaoTalkShareProps): void => {
  const { Kakao } = window;

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: `[${brand}] ${productName}`,
      description: `유효기간: ${dueDate}`,
      imageUrl: `${imageUrl}`,
      link: {
        mobileWebUrl: 'https://6e3b-218-144-28-118.ngrok-free.app',
        webUrl: 'https://6e3b-218-144-28-118.ngrok-free.app',
      },
    },
    itemContent: {
      profileText: '🎁 기프티콘을 받으세요!',
    },
    buttons: [
      {
        title: '기프티콘 이미지 보기',
        link: {
          mobileWebUrl: `${imageUrl}`,
          webUrl: `${imageUrl}`,
        },
      },
    ],
  });
};
