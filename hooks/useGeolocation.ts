"use client"

import { useState, useEffect } from 'react';
import { Location } from '@/types/map';

const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 가져오기 실패했을 때 상황에 따른 에러 메시지
  const showErrorMsg = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError('위치 정보 접근이 거부되었습니다. 브라우저 설정에서 권한을 허용해주세요.');
        break;
      case error.POSITION_UNAVAILABLE:
        setError('위치 정보를 사용할 수 없습니다. 위치 서비스를 활성화해주세요.');
        break;
      case error.TIMEOUT:
        setError('위치 정보를 가져오기 위한 요청이 허용 시간을 초과했습니다.');
        break;
      default:
        setError('알 수 없는 오류가 발생했습니다. 관리자에게 문의하세요.');
        break;
    }
  }

  useEffect(() => {
    if ('geolocation' in navigator) {
      // 현 브라우저가 Geolocation API를 지원하는지 확인
      navigator.geolocation.getCurrentPosition(
        // 사용자의 현재 위치를 요청
        (position) => {
          setLocation({
            latitude: position.coords.latitude, // 위도값 저장
            longitude: position.coords.longitude // 경도값 저장
          });
        },
        (error) => {
          showErrorMsg(error); // 상황에 따른 에러 메시지 호출
        },
        {
          // 옵션 객체
          enableHighAccuracy: true, // 정확도 우선 모드
          timeout: 60000, // 1분 이내에 응답 없으면 에러 발생
          maximumAge: 0 // 항상 최신 위치 정보 수집
        }
      )
    } else {
      setError('브라우저가 사용자 위치 파악 api를 지원하지 않습니다.');
    }
  }, [])

  return location ? { location } : { error }
};

export default useGeolocation;