import { useState, useEffect } from 'react';
import { Location } from '@/types/Location';

const DEFAULT_LOCATION: Location = {
  latitude: 37.5665, // 서울 시청 위도
  longitude: 126.9780, // 서울 시청 경도
};

const useGeolocation = () => {
  const [location, setLocation] = useState<Location | null>(null)
  const [error, setError] = useState<string | null>(null)

  // 가져오기 실패했을 때 상황에 따른 에러 메시지
  const showErrorMsg = (error: GeolocationPositionError) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError('위치 정보 접근이 거부되었습니다. 기본 위치(서울 시청)로 설정합니다.');
        setLocation(DEFAULT_LOCATION);
        break;
      case error.POSITION_UNAVAILABLE:
        setError('위치 정보를 사용할 수 없습니다. 기본 위치(서울 시청)로 설정합니다.');
        setLocation(DEFAULT_LOCATION);
        break;
      case error.TIMEOUT:
        setError('위치 정보를 가져오기 위한 요청이 허용 시간을 초과했습니다. 기본 위치(서울 시청)로 설정합니다.');
        setLocation(DEFAULT_LOCATION);
        break;
      default:
        setError('알 수 없는 오류가 발생했습니다. 기본 위치(서울 시청)로 설정합니다.');
        setLocation(DEFAULT_LOCATION);
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
      setError('브라우저가 위치 파악을 지원하지 않습니다. 기본 위치(서울 시청)로 설정합니다.');
      setLocation(DEFAULT_LOCATION);
    }
  }, [])

  return location ? { location } : { error }
};

export default useGeolocation;