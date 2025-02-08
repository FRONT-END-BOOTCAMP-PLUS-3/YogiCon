'use client';

import { AlarmDto } from '@/application/usecases/alarm/dto/AlarmDto';
import { CreateAlarmDto } from '@/application/usecases/alarm/dto/CreateAlarmDto';
import ModalDialog from '@/components/ModalDialog';
import { useEffect, useState } from 'react';
import Select, { SingleValue, StylesConfig } from 'react-select';
import styled from 'styled-components';

/* ---------------------------------- style --------------------------------- */
const AlarmContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  width: 100%;
  height: 2.32rem;
  background-color: var(--lightgray);
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  margin-top: -1.5rem;
  color: var(--deepgray);
  font-size: 1rem;
`;

const AlarmList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  padding: 1rem;
`;

const AlarmItem = styled.li`
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
    border-bottom-right-radius: 0.9375rem;
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
  cursor: pointer;
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

/* ---------------------------------- type --------------------------------- */
// react-select에서 사용할 옵션 타입 정의
type Option<T> = {
  value: T;
  label: string;
};

/* ---------------------------------- component --------------------------------- */
const Alarm = () => {
  const [alarms, setAlarms] = useState<AlarmDto[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newAlarm, setNewAlarm] = useState<CreateAlarmDto>({
    id: crypto.randomUUID(),
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

  const checkDuplication = (alarmToCheck: AlarmDto): boolean => {
    return alarms.some(
      (alarm) =>
        alarm.daysBefore === alarmToCheck.daysBefore &&
        alarm.period === alarmToCheck.period &&
        alarm.time === alarmToCheck.time
    );
  };

  const handleSelectChange = <T extends number | string>(
    field: keyof AlarmDto,
    selectedOption: SingleValue<Option<T>>
  ) => {
    if (selectedOption) {
      setNewAlarm((prev) => ({
        ...prev,
        [field]: selectedOption.value,
      }));
    }
  };

  const handleConfirm = async () => {
    if (checkDuplication(newAlarm)) {
      alert('이미 같은 알람이 존재합니다. 다른 설정을 선택해주세요.');
      return;
    }

    if (alarms.length < 5) {
      await fetch('/api/user/alarms', {
        method: 'POST',
        body: JSON.stringify(newAlarm),
      });

      setAlarms((prev) => [...prev, newAlarm]);
      setIsModalOpen(false);
      setNewAlarm({
        id: crypto.randomUUID(),
        daysBefore: 1,
        period: '오전',
        time: 9,
      });
    }
  };

  const handleDeleteButtonClick = (alarmId: string) => async () => {
    await fetch('/api/user/alarms', {
      method: 'DELETE',
      body: JSON.stringify({ id: alarmId }),
    });
    setAlarms((prev) => prev.filter((alarm) => alarm.id !== alarmId));
  };

  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const res = await fetch(`/api/user/alarms`);

        if (!res.ok) {
          throw new Error('Response Error');
        }

        const data = await res.json();
        setAlarms(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('An unexpected error occurred');
        }
      }
    };

    fetchAlarms();
  }, []);

  return (
    <AlarmContainer>
      <Title>유효기간 만료알림 설정 (최대 5개)</Title>
      <AlarmList>
        {alarms.map((alarm) => (
          <AlarmItem key={alarm.id}>
            <span>
              {alarm.daysBefore}일 전 {alarm.period} {alarm.time}시
            </span>
            <DeleteButton
              type="button"
              onClick={handleDeleteButtonClick(alarm.id)}
            >
              x
            </DeleteButton>
          </AlarmItem>
        ))}
        {alarms.length < 5 && (
          <AddAlarmButton type="button" onClick={openModal}>
            + 알람 추가
          </AddAlarmButton>
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
