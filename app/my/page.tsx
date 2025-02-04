'use client';

import Name from '@/app/my/components/Name';
import Alarm from '@/app/my/components/Alarm';
import Trash from '@/app/my/components/Trash';
import Logout from '@/app/my/components/Logout';
import DeleteID from '@/app/my/components/DeleteID';
import styled from 'styled-components';

const Blank = styled.div`
  height: 1.75rem;
  background-color: var(--lightgray);
`;
const MyContainer = styled.div``;

const My = () => {
  return (
    <MyContainer>
      <Name />
      <Alarm />
      <Trash />
      <Logout />
      <DeleteID />
      <Blank />
    </MyContainer>
  );
};

export default My;
