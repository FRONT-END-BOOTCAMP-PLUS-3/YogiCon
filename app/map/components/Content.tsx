'use client';

import styled from 'styled-components';
import ConListItem from '@/components/ConListItem';

const BSContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function BottomSheetContent() {
  return (
    <BSContentContainer>
      <ConListItem
        category={'패스트푸드'}
        brand={'BHC'}
        name={'뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />
      <ConListItem
        category={'패스트푸드'}
        brand={'BHC'}
        name={'뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />
      <ConListItem
        category={'패스트푸드'}
        brand={'BHC'}
        name={'뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />
      <ConListItem
        category={'패스트푸드'}
        brand={'BHC'}
        name={'뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />
      <ConListItem
        category={'패스트푸드'}
        brand={'BHC'}
        name={'뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />
      <ConListItem
        category={'패스트푸드'}
        brand={'BHC'}
        name={'뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />
      <ConListItem
        category={'패스트푸드'}
        brand={'BHC'}
        name={'뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />
      <ConListItem
        category={'패스트푸드'}
        brand={'BHC'}
        name={'뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />

      <div style={{ paddingTop: '80px' }}></div>
    </BSContentContainer>
  );
}
