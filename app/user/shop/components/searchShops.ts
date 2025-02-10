/* eslint-disable @typescript-eslint/no-explicit-any */

// 마커를 저장할 배열
const markers: any[] = [];

/**
 * 키워드로 장소를 검색하고, 지도에 마커와 인포윈도우를 표시합니다.
 * 지도 중심 좌표를 기준으로 검색 옵션을 추가합니다.
 *
 * @param map - 카카오 지도 인스턴스
 * @param keyword - 검색할 장소 키워드 (예: '이태원 맛집')
 * @param onError - 검색 실패 시 실행할 콜백 함수 (예: ZERO_RESULT 상태)
 */
export const searchShops = (map: any, keyword: string | null, onError: (message: string) => void): void => {
  if (!window.kakao) {
    onError('Kakao 지도 API 로드 실패')
    return;
  }

  // 지도 중심 좌표를 가져와서 검색 옵션으로 사용
  const center = map.getCenter();

  // 마커 클릭 시 장소명을 보여줄 인포윈도우 생성
  const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

  // 장소 검색 객체 생성
  const ps = new window.kakao.maps.services.Places();

  // 키워드로 장소 검색 실행, 지도 중심을 옵션으로 전달
  ps.keywordSearch(
    keyword,
    (data: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기 위한 LatLngBounds 객체 생성
        const bounds = new window.kakao.maps.LatLngBounds();
        // 기존 마커 제거
        markers.forEach(marker => marker.setMap(null));
        markers.length = 0;

        for (let i = 0; i < data.length; i++) {
          // 각 장소에 대해 마커 표시
          displayMarker(map, data[i], infowindow, markers);
          // 검색된 장소의 좌표를 bounds에 추가
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소들을 모두 포함하는 영역으로 지도 범위 재설정
        map.setBounds(bounds);
        console.log("중심:", center);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        console.warn('검색 결과가 없습니다.');
        onError(`"${keyword}"에 대한 검색 결과가 없습니다.`)
      } else {
        console.error('장소 검색 실패', status);
        onError('장소 검색 중 오류가 발생했습니다.');
      }
    },
    { location: center, radius: 1200 } // 옵션 객체에 지도 중심 좌표 전달 (검색 기준 좌표)
  );
};

/**
 * 지도에 마커를 표시하고, 마커 클릭 시 인포윈도우에 장소명을 보여줍니다.
 * @param map - 카카오 지도 인스턴스
 * @param place - 장소 정보 객체 (API 검색 결과 항목)
 * @param infowindow - 인포윈도우 인스턴스
 */
const displayMarker = (map: any, place: any, infowindow: any, markers: any,): void => {
  // 마커 생성 및 지도에 표시
  const marker = new window.kakao.maps.Marker({
    map: map,
    position: new window.kakao.maps.LatLng(place.y, place.x),
  });
  markers.push(marker);

  // 마커 클릭 이벤트 등록: 클릭 시 인포윈도우에 장소명을 표시
  window.kakao.maps.event.addListener(marker, 'click', function () {
    const content = `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`;
    infowindow.setContent(content);
    infowindow.open(map, marker);
  });
};