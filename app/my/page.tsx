'use client';

import Name from '@/app/my/components/Name';
import Alarm from '@/app/my/components/Alarm';
import Trash from '@/app/my/components/Trash';
import Logout from '@/app/my/components/Logout';
import DeleteID from '@/app/my/components/DeleteID';
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
      <Trash />
      <Logout />
      <DeleteID />
    </MyContainer>
  );
};

export default My;
