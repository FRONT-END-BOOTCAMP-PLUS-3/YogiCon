'use client';

import styled from 'styled-components';

const Wrapper = styled.div`
  height: 40px;
  border-top-left-radius: 12px;
  border-bottom-right-radius: 12px;
  position: relative;
  padding: 12px 0 4px 0;
`;

const Handle = styled.div`
  width: 100px;
  height: 4px;
  border-radius: 2px;
  background-color: var(--disabled);
  margin: auto;
`;

const BottomSheetHeader = () => {
  return (
    <Wrapper>
      <Handle />
    </Wrapper>
  );
};

export default BottomSheetHeader;
