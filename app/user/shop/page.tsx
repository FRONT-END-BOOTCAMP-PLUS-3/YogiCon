/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { GiftDto } from '@/application/usecases/gift/dto/GiftDto';
import { useShopStore } from '@/stores/useShopStore';
import { Location } from '@/types/Location';
import { SelectedItem } from '@/types/SelectedItem';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MdMyLocation } from 'react-icons/md';
import { RiResetLeftLine } from 'react-icons/ri';
import styled from 'styled-components';
import BottomSheet from './components/BottomSheet';
import KakaoMap from './components/KakaoMap';
import { useUserStore } from '@/stores/userStore';

/* ---------------------------------- style --------------------------------- */
const ShopContainer = styled.div`
  width: 100%;
  height: calc(100vh - 3.375rem);
  background-color: var(--disabled);
  position: relative;
  z-index: 1;
`;

const MyLocation = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: auto;
  aspect-ratio: 1/1;
  border: none;
  border-radius: 50%;
  color: var(--deepgray);
  background-color: var(--white);
  box-shadow: 2px 2px 5px var(--disabled);
  position: absolute;
  left: 15px;
  bottom: 160px;
  z-index: 1;

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const ResearchButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: fit-content;
  text-align: center;
  word-break: keep-all;
  padding: 5px 1rem;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 1rem;
  color: var(--deepgray);
  background-color: var(--white);
  box-shadow: 2px 2px 5px var(--disabled);
  position: absolute;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;

  & span {
    width: fit-content;
    position: relative;
    bottom: 0.125rem;
  }
`;

/* ---------------------------------- component --------------------------------- */
export default function Shop() {
  const userData = useUserStore((state) => state.userData);
  const userId = userData?.id;
  const searchParams = useSearchParams();
  const giftId = searchParams.get('giftId');
  const key = searchParams.get('key');
  const [selectedItemKey, setSelectedItemKey] = useState<SelectedItem | null>(
    giftId && key ? { giftId, key: key } : null
  );
  const mapRef = useRef<any>(null);
  const [savedLocation, setSavedLocation] = useState<Location | null>(null);

  const [giftList, setGiftList] = useState<GiftDto[]>([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [headerGift, setHeaderGift] = useState<GiftDto | null>(null);
  const { setItemClicked } = useShopStore();

  const observer = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (!hasNextPage || !node) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          console.log('마지막 요소 감지됨');
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasNextPage]
  );

  useEffect(() => {
    const fetchGiftList = async () => {
      try {
        setLoading(true);
        const query = {
          select: '전체',
          search: '',
          page: page,
        };
        // disabled 되지 않은 gift list 가져오는 api 사용
        const response = await fetch(
          `/api/user/gifts?selectedCategory=${query.select}&searchWord=${query.search}&page=${query.page}&userId=${userId}`,
          { method: 'GET' }
        );

        if (!response.ok) {
          alert('기프티콘 리스트를 불러오는데 실패했습니다.');
          return;
        }

        const giftListDto = await response.json();
        if (giftListDto.data.giftList.imageUrl)
          console.log('조회된 기프티콘 리스트: ', giftListDto.data);

        if (page === 1) {
          setGiftList(giftListDto.data.giftList);
          setHasNextPage(true);
        } else {
          setGiftList((prev) => [...prev, ...giftListDto.data.giftList]);
        }

        setHasNextPage(giftListDto.data.hasNextPage);
      } catch (error) {
        console.error('데이터 로드 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hasNextPage) fetchGiftList();
  }, [hasNextPage, page]);

  useEffect(() => {
    const getGiftById = async (): Promise<any> => {
      try {
        const res = await fetch(`/api/user/gifts/${selectedItemKey!.giftId}`, {
          method: 'GET',
        });

        if (!res.ok) {
          throw new Error('Response Error');
        }
        const data = await res.json();
        setHeaderGift(data.gift);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err.message);
        } else {
          console.error('An unexpected error occurred');
        }
      }
    };

    if (!selectedItemKey || !selectedItemKey.giftId) return;

    getGiftById();
  }, [selectedItemKey]);

  const findMyLocation = () => {
    if (mapRef.current && savedLocation) {
      const newCenter = new window.kakao.maps.LatLng(
        savedLocation.latitude,
        savedLocation.longitude
      );
      mapRef.current.setCenter(newCenter);
    }
  };

  const handleMapLoad = useCallback((map: any, initialLocation: Location) => {
    mapRef.current = map;
    setSavedLocation(initialLocation);
    console.log(initialLocation);
  }, []);

  const handleItemClick = (selectedItem: SelectedItem) => {
    setSelectedItemKey(selectedItem);
  };

  const handleResearchClick = () => {
    setItemClicked(true);
  };

  return (
    <ShopContainer>
      <KakaoMap
        onMapLoad={handleMapLoad}
        searchKeyword={selectedItemKey?.key ?? ''}
      />

      <MyLocation type="button" onClick={findMyLocation}>
        <MdMyLocation />
      </MyLocation>

      {selectedItemKey?.key && (
        <ResearchButton type="button" onClick={handleResearchClick}>
          <RiResetLeftLine />
          <span>현재 지도에서 재검색</span>
        </ResearchButton>
      )}

      <BottomSheet
        setSelectedItemKey={handleItemClick}
        giftList={giftList}
        loading={loading}
        headerGift={headerGift}
        lastElementRef={lastElementRef}
      />
    </ShopContainer>
  );
}
