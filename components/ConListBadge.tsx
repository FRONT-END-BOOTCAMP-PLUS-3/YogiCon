'use client';

import styled from 'styled-components';

const BadgeWrapper = styled.div<{ $isLarge: boolean }>`
  width: ${(props) => (props.$isLarge ? '50px' : '30px')};
  height: ${(props) => (props.$isLarge ? '50px' : '30px')};
  background-color: transparent;
`;

const BadgeBox = styled.div<{ $isDue: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  aspect-ratio: 1/1;
  text-align: center;
  border-radius: 50%;
  background-color: ${(props) =>
    props.$isDue ? 'var(--warning)' : 'var(--safety)'};
`;

const BadgeDayText = styled.p<{ $isLarge: boolean }>`
  color: var(--white);
  font-weight: bold;
  font-size: ${(props) => (props.$isLarge ? '0.9rem' : '0.4rem')};
`;

// 프롭스
type ConListBadgeProps = {
  duedate: string;
  isLarge: boolean;
};

// 컴포넌트
export default function ConListBadge({ duedate, isLarge = true }: ConListBadgeProps) {

  const dateObject: Date = new Date(duedate);
  const dateTodayObject: Date = new Date();

  // 날짜만 비교하기 위해 시간을 제거
  const dueDateOnly = new Date(
    dateObject.getFullYear(),
    dateObject.getMonth(),
    dateObject.getDate()
  );
  const todayDateOnly = new Date(
    dateTodayObject.getFullYear(),
    dateTodayObject.getMonth(),
    dateTodayObject.getDate()
  );

  // 날짜 차이 계산 (밀리초 단위 → 일 단위 변환)
  const diffTime = dueDateOnly.getTime() - todayDateOnly.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // 밀리초를 하루 단위로 변환

  return (
    <BadgeWrapper $isLarge={isLarge}>
      <BadgeBox $isDue={diffDays <= 3}>
        <BadgeDayText $isLarge={isLarge}>
          {diffDays === 0 ? "D-0" : `D-${Math.abs(diffDays)}`}
        </BadgeDayText>
      </BadgeBox>
    </BadgeWrapper>
  );
};
