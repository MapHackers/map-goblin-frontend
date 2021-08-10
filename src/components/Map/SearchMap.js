import React, { useState } from 'react';
import { Button, Drawer, Input, List } from 'antd';

const { kakao } = window;

const SearchMap = ({ setsearchdAndClickedPlace, setmapCenter }) => {
  const { Search } = Input;

  var ps = new kakao.maps.services.Places();
  // 키워드 검색 완료 시 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination) {
    // TODO 데이터가 없을 때 아무것도 안뜨고 status가 zero로 나오는데 이때도 처리해주자
    if (status === kakao.maps.services.Status.OK) {
      setsearchedPlace(data);
    }
  }
  const [visible, setVisible] = useState(false);
  const [searchValue, setsearchValue] = useState();
  const [searchedPlace, setsearchedPlace] = useState([]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onSearch = () => {
    ps.keywordSearch(searchValue, placesSearchCB);
  };

  const SearchedList = ({ searchedPlace }) => (
    <List
      dataSource={searchedPlace}
      header={`${searchedPlace.length} ${searchedPlace.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 5,
      }}
      renderItem={(item, idx) => (
        <div
          style={{ marginBottom: '10px', marginTop: '10px' }}
          onClick={() => {
            setmapCenter(new kakao.maps.LatLng(item.y, item.x));
            setsearchdAndClickedPlace({ latlng: new kakao.maps.LatLng(item.y, item.x) });
          }}
          key={idx}
        >
          <div className="head_item">
            <strong style={{ fontSize: '1.2rem' }}> {item.place_name} </strong>
            <span style={{ fontSize: '0.9rem', marginLeft: '3px' }}>
              {item.category_name.split(' ')[item.category_name.split(' ').length - 1]}
            </span>
          </div>
          <div className="info">
            <div className="address">
              <p style={{ margin: 0, padding: 0, color: 'GrayText' }}> {item.road_address_name}</p>
              <p style={{ margin: 0, padding: 0, color: 'GrayText' }}> {item.address_name} </p>
            </div>
            <div>
              <span style={{ color: 'green', fontSize: '0.8rem' }}> {item.phone} </span>
            </div>
          </div>
        </div>
      )}
    />
  );

  return (
    <>
      <Button
        type="primary"
        onClick={showDrawer}
        style={{ zIndex: '999', left: '10px', top: '10px' }}
      >
        검색하기
      </Button>
      <Drawer
        title="길 찾기"
        placement="left"
        closable={true}
        onClose={onClose}
        visible={visible}
        getContainer={false}
        style={{ position: 'absolute' }}
        width="400"
      >
        <Search
          placeholder="장소, 주소 검색"
          size="large"
          value={searchValue}
          onChange={(event) => {
            setsearchValue(event.currentTarget.value);
          }}
          onSearch={onSearch}
          enterButton
        />
        <SearchedList searchedPlace={searchedPlace} />
      </Drawer>
    </>
  );
};

export default SearchMap;
