'use client';

import { useBottomSheetDimensions } from '@/hooks/bottomSheetOption';
import useBottomSheet from '@/hooks/useBottomSheet';
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
  top: calc(100vh - 120px); /*시트가 얼마나 높이 위치할지*/

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
  selectedItemKey: string | null;
  setSelectedItemKey: (key: string) => void;
};

/* ---------------------------------- component --------------------------------- */
function BottomSheet({
  selectedItemKey,
  setSelectedItemKey,
}: BottomSheetProps) {
  const { sheet, content, moveSheetToBottom } = useBottomSheet();
  const { bottomSheetHeight } = useBottomSheetDimensions();

  if (bottomSheetHeight === null) return null;
  return (
    <Container ref={sheet} height={bottomSheetHeight}>
      <BottomSheetHeader />
      <BSContentBox ref={content}>
        <BottomSheetContent
          selectedItemKey={selectedItemKey}
          setSelectedItemKey={setSelectedItemKey}
          moveSheetToBottom={moveSheetToBottom}
        />
      </BSContentBox>
    </Container>
  );
}

export default BottomSheet;
