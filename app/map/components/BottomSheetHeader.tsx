'use client';

import styled from 'styled-components';
import { MdOutlineStorefront } from 'react-icons/md';

/* ---------------------------------- style --------------------------------- */
const Wrapper = styled.div`
  min-height: 120px;
  border-top-left-radius: 12px;
  border-bottom-right-radius: 12px;
  position: relative;
  padding: 0.75rem 0 0.25rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Handle = styled.div`
  width: 100px;
  height: 4px;
  border-radius: 2px;
  background-color: var(--deepgray);
  margin: auto;
`;

const DcContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.9rem;
  align-items: center;
  color: var(--deepgray);
`;

const DcSvg = styled(MdOutlineStorefront)`
  font-size: 2.5rem;
`;

const DcText = styled.span`
  line-height: 1.5;
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
`;

const Line = styled.hr`
  margin: 0;
  border: 1.2px solid var(--deepgray);
  border-radius: 10px;
  width: 90%;
`;

/* ---------------------------------- component --------------------------------- */
const BottomSheetHeader = () => {
  return (
    <Wrapper>
      <Handle />
      <DcContainer>
        <DcSvg />
        <DcText>
          <p>기프티콘을 사용할 수 있는</p>
          <p>근처 매장을 찾아드릴게요!</p>
        </DcText>
      </DcContainer>
      <Line />
    </Wrapper>
  );
};

export default BottomSheetHeader;
