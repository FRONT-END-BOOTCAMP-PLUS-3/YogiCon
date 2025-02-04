'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import ModalDialog from '@/components/ModalDialog';
import Select, { StylesConfig, SingleValue } from 'react-select';

// 알람 객체 타입 정의
interface AlarmType {
  daysBefore: number;
  period: '오전' | '오후';
  time: number;
}

// react-select에서 사용할 옵션 타입 정의
interface Option<T> {
  value: T;
  label: string;
}
/* ---------------------------------- style --------------------------------- */
const AlarmContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  width: 100%;
  height: 2.32rem;
  background-color: var(--lightgray);
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  margin-top: -1.5rem;
  p {
    color: var(--deepgray);
    font-size: 1rem;
  }
`;

const AlarmList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  padding: 1rem;
`;

const AlarmItem = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--lightgray);
  padding: 0.5rem;
  border: 1px solid var(--disabled);
  span {
    padding: 0.3rem;
  }
  &:first-of-type {
    border-top-left-radius: 0.9375rem;
    border-top-right-radius: 0.9375rem;
  }
  &:last-of-type {
    border-bottom-left-radius: 0.9375rem;
    border-bottom-right-radius: 0.9375;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  background: transparent;
  border: none;
  color: var(--main);
  font-size: 1.25rem;
`;

const AddAlarmButton = styled.button`
  width: 90%;
  display: flex;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  justify-content: center;
  border-radius: 0.625rem;
  margin-top: 1rem;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

/* react-select 스타일 */
const customSelectStyles: StylesConfig<any, false> = {
  menuList: (provided) => ({
    ...provided,
    maxHeight: '10rem',
    overflowY: 'auto',
  }),
};
/* ---------------------------------- component --------------------------------- */
const Alarm = () => {
  const [alarms, setAlarms] = useState<AlarmType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newAlarm, setNewAlarm] = useState<AlarmType>({
    daysBefore: 1,
    period: '오전',
    time: 9,
  });

  // react-select 옵션 배열들
  const daysBeforeOptions: Option<number>[] = Array.from(
    { length: 10 },
    (_, i) => ({
      value: i + 1,
      label: `${i + 1}일 전`,
    })
  );

  const periodOptions: Option<'오전' | '오후'>[] = [
    { value: '오전', label: '오전' },
    { value: '오후', label: '오후' },
  ];

  const timeOptions: Option<number>[] = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1} 시`,
  }));

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSelectChange = <T extends number | string>(
    field: keyof AlarmType,
    selectedOption: SingleValue<Option<T>>
  ) => {
    if (selectedOption) {
      setNewAlarm((prev) => ({
        ...prev,
        [field]: selectedOption.value,
      }));
    }
  };

  const handleConfirm = () => {
    if (alarms.length < 5) {
      setAlarms((prev) => [...prev, newAlarm]);
      setIsModalOpen(false);
      setNewAlarm({ daysBefore: 1, period: '오전', time: 9 });
    }
  };

  const deleteAlarm = (index: number) => {
    setAlarms((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <AlarmContainer>
      <Title>
        <p>유효기간 만료알림 설정</p>
      </Title>
      <AlarmList>
        {alarms.map((alarm, index) => (
          <AlarmItem key={index}>
            <span>
              {alarm.daysBefore}일 전 {alarm.period} {alarm.time}시
            </span>
            <DeleteButton onClick={() => deleteAlarm(index)}>x</DeleteButton>
          </AlarmItem>
        ))}
        {alarms.length < 5 && (
          <AddAlarmButton onClick={openModal}>+알람 추가</AddAlarmButton>
        )}
      </AlarmList>
      <ModalDialog
        isOpen={isModalOpen}
        buttonCount={2}
        onConfirm={handleConfirm}
        onClose={closeModal}
      >
        <ModalContent>
          <FieldRow>
            <label htmlFor="daysBefore">기간 :</label>
            <Select
              inputId="daysbefore"
              name="daysBefore"
              styles={customSelectStyles}
              options={daysBeforeOptions}
              value={daysBeforeOptions.find(
                (option) => option.value === newAlarm.daysBefore
              )}
              onChange={(option) =>
                handleSelectChange<number>('daysBefore', option)
              }
            />
          </FieldRow>
          <FieldRow>
            <label htmlFor="period">오전/오후 :</label>
            <Select
              inputId="period"
              name="period"
              styles={customSelectStyles}
              options={periodOptions}
              value={periodOptions.find(
                (option) => option.value === newAlarm.period
              )}
              onChange={(option) =>
                handleSelectChange<'오전' | '오후'>('period', option)
              }
            />
          </FieldRow>
          <FieldRow>
            <label htmlFor="time">시간 :</label>
            <Select
              inputId="time"
              name="time"
              styles={customSelectStyles}
              options={timeOptions}
              value={timeOptions.find(
                (option) => option.value === newAlarm.time
              )}
              onChange={(option) => handleSelectChange<number>('time', option)}
            />
          </FieldRow>
        </ModalContent>
      </ModalDialog>
    </AlarmContainer>
  );
};

export default Alarm;
