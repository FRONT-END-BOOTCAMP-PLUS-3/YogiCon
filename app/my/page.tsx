'use client';

import Alarm from '@/app/my/components/Alarm';
import MyButton from '@/app/my/components/MyButton';
import Name from '@/app/my/components/Name';
import styled from 'styled-components';

const MyContainer = styled.div`
  background-color: var(--lightgray);
  height: calc(100vh - 1.5rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const My = () => {
  return (
    <MyContainer>
      <Name />
      <Alarm />
      <MyButton id="trash" />
      <MyButton id="logout" />
      <MyButton id="deleteID" />
    </MyContainer>
  );
};

export default My;
