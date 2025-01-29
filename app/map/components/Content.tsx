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
        name={'1번뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />
      <ConListItem
        category={'패스트푸드'}
        brand={'BHC'}
        name={'2번뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />
      <ConListItem
        category={'패스트푸드'}
        brand={'BHC'}
        name={'3번뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />
      <ConListItem
        category={'패스트푸드'}
        brand={'BHC'}
        name={'4번뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />
      <ConListItem
        category={'패스트푸드'}
        brand={'BHC'}
        name={'5번뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />
      <ConListItem
        category={'패스트푸드'}
        brand={'BHC'}
        name={'6번뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />
      <ConListItem
        category={'패스트푸드'}
        brand={'BHC'}
        name={'7번뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />
      <ConListItem
        category={'패스트푸드'}
        brand={'BHC'}
        name={'8번뿌링클 콤보뿌링클 콤보뿌링클 콤보뿌링클 콤보'}
        duedate={'2026-01-26T00:00:00.000Z'}
        isDeleted={false}
      />

      <div style={{ padding: '20px 0' }}>
        <p>더 이상 기프티콘이 없어요!</p>
      </div>
    </BSContentContainer>
  );
}
