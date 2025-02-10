'use client';

import { GiftDto } from '@/application/usecases/gift/dto/GiftDto';
import useBottomSheet from '@/hooks/useBottomSheet';
import { useBottomSheetDimensions } from '@/hooks/useBottomSheetOption';
import { SelectedItem } from '@/types/SelectedItem';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import BottomSheetContent from './BottomSheetContent';
import BottomSheetHeader from './BottomSheetHeader';

/* ---------------------------------- style --------------------------------- */
const Container = styled(motion.div)<{ height: number }>`
  display: flex;
  flex-direction: column;

  position: fixed;
  z-index: 1;
  top: calc(100vh - 135px); /*시트가 얼마나 높이 위치할지*/

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0px 0px 10px var(--disabled);
  height: ${({ height }) => height - 30}px;
  width: 100%;
  max-width: 768px;
  left: 50%;
  transform: translateX(-50%);

  background-color: var(--white);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  transition: transform 400ms ease-out; /*바텀시트 애니메이션 속도*/
`;

const BSContentBox = styled.div`
  overflow: auto;
  -webkit-overflow-scrolling: touch;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari */
  }
`;

/* ---------------------------------- type --------------------------------- */
type BottomSheetProps = {
  setSelectedItemKey: (selectedItem: SelectedItem) => void;
  giftList: GiftDto[] | null;
  loading: boolean;
  headerGift: GiftDto | null;
};

/* ---------------------------------- component --------------------------------- */
function BottomSheet({
  setSelectedItemKey,
  giftList,
  loading,
  headerGift,
}: BottomSheetProps) {
  const { sheet, content, moveSheetToBottom } = useBottomSheet();
  const { bottomSheetHeight } = useBottomSheetDimensions();

  if (bottomSheetHeight === null) return null;
  return (
    <Container ref={sheet} height={bottomSheetHeight}>
      <BottomSheetHeader headerGift={headerGift} />
      <BSContentBox ref={content}>
        <BottomSheetContent
          setSelectedItemKey={setSelectedItemKey}
          moveSheetToBottom={moveSheetToBottom}
          giftList={giftList}
          loading={loading}
        />
      </BSContentBox>
    </Container>
  );
}

export default BottomSheet;
