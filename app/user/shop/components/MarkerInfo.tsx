'use client';

import Image from 'next/image';
import styled from 'styled-components';

interface MarkerInfoProps {
  place_name: string;
}

const MarkerInfoContainer = styled.div`
  width: auto;
  padding: 0.3rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 1rem;
  background-color: var(--white);
  box-shadow: 0 1px 2px var(--deepgray);
  border-radius: 1rem;

  & svg {
    font-size: 1.5rem;
    position: relative;
    top: -0.125rem;
    color: var(--deepgray);
  }

  & span {
    position: relative;
    top: -0.125rem;
  }
`;

const MarkerInfoImage = styled(Image)`
  width: 1.25rem;
  height: auto;
  aspect-ratio: 20/21;
  object-fit: contain;
`;

const MarkerInfo = ({ place_name }: MarkerInfoProps) => {
  const isCurrentPosition = place_name === '현재 위치';
  return (
    <MarkerInfoContainer>
      {!isCurrentPosition && (
        <MarkerInfoImage
          width={20}
          height={21}
          src="/shop_logo.png"
          alt="로고 그림"
        />
      )}

      <span>{place_name}</span>
    </MarkerInfoContainer>
  );
};

export default MarkerInfo;
