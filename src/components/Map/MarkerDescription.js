import React, { useState, useEffect } from 'react';
import { Tabs, Rate, Divider, Comment, Input, Form, Button, List, Image } from 'antd';
import { InfoCircleOutlined, CommentOutlined, HeartFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../../util/Api';
import { registerReview } from '../../util/api/map';
import { mapActinos } from '../../store/map';

const { TabPane } = Tabs;

const { TextArea } = Input;

const Editor = ({ onChange, onSubmit, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} placeholder="리뷰를 입력해 주세요" />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 5,
    }}
    renderItem={(props) => <Comment {...props} />}
  />
);

const MarkerDescription = ({ mapId }) => {
  const dispatch = useDispatch();

  const clickedMarker = useSelector((state) => state.map.clickedMarker);
  const userName = useSelector((state) => state.user.userName);

  const [reviewInput, setreviewInput] = useState('');
  const [value, setValue] = useState(0);
  const [reviewList, setreviewList] = useState([]);

  //* 리뷰 데이터들을 작성자 별점등을 표현할 수 있게 가공
  useEffect(() => {
    setreviewList([]);
    clickedMarker.reviews.forEach((review) => {
      setreviewList((reviews) => [
        ...reviews,
        {
          author: (
            <span style={{ display: 'flex' }}>
              <p>{review.author}</p>{' '}
              <Rate
                style={{ marginLeft: '16px', fontSize: '14px' }}
                disabled
                allowHalf
                value={review.rating}
              />
            </span>
          ),
          content: <p>{review.content}</p>,
        },
      ]);
    });
  }, [clickedMarker.reviews]);

  const handleReviewSubmit = async () => {
    if (!reviewInput) {
      return;
    }

    if (value === 0) {
      alert(`별점을 선택해 주세요`);
      return;
    }

    let dataToSubmit = {
      mapId: mapId,
      layerName: clickedMarker.layerName,
      geometry: clickedMarker.latlng,
      author: userName,
      content: reviewInput,
      rating: value,
    };
    try {
      await registerReview(dataToSubmit);
    } catch (e) {
      console.log(e);
    }
    dispatch(
      mapActinos.setClickedMarkerReview([
        {
          author: userName,
          content: reviewInput,
          rating: value,
        },
        ...clickedMarker.reviews,
      ])
    );

    setreviewInput('');
    setValue(0);
  };

  const handleRatingChange = async (value) => {
    setValue(value);
  };

  return (
    <div style={{ padding: '0', marginTop: '-25px' }}>
      <Tabs defaultActiveKey="1" tabBarGutter={100}>
        <TabPane
          tab={
            <span>
              <InfoCircleOutlined /> Information{' '}
            </span>
          }
          key="1"
        >
          <div>
            <h1> {clickedMarker.name} </h1>
            <Rate
              disabled
              allowHalf={true}
              value={clickedMarker.rating}
              style={{ marginBottom: '25px' }}
            />
            {clickedMarker.thumbnail.substr(0, 4) === 'http' ? (
              <Image
                preview={false}
                style={{ width: '400px', marginLeft: '30px' }}
                src={clickedMarker.thumbnail}
                alt="staticImage"
              />
            ) : (
              <Image
                preview={false}
                style={{ width: '400px', marginLeft: '30px' }}
                src={Api.defaults.baseURL + '/files/' + clickedMarker.thumbnail}
                alt="cau"
                fallback="../../no-image3.png"
              />
            )}
            <h3 style={{ marginTop: '25px' }}> {clickedMarker.description} </h3>
          </div>
        </TabPane>
        <TabPane
          tab={
            <span>
              <CommentOutlined /> Review{' '}
            </span>
          }
          key="2"
        >
          <div>
            <h2> {clickedMarker.title} </h2>
            <Rate
              character={<HeartFilled />}
              allowHalf
              allowClear={false}
              value={value}
              style={{ fontSize: '40px', marginBottom: '25px' }}
              onChange={handleRatingChange}
            />
            <Divider style={{ marginTop: '0px' }}> Review </Divider>

            <Comment
              content={
                <Editor
                  onChange={(event) => {
                    setreviewInput(event.currentTarget.value);
                  }}
                  onSubmit={handleReviewSubmit}
                  value={reviewInput}
                />
              }
            />
            <CommentList comments={reviewList} />
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default MarkerDescription;
