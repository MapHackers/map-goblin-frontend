import React from 'react';
import styled from 'styled-components';

import { Divider } from 'antd';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlideButton from '../components/NetflixSlider/SlideButton';
import MainContentSlider from '../components/MainContentSlider/MainContentSlider';

import Card from '../components/CardView/CardView';
import ExpandingText from '../components/ExpandingText/ExpandingText';

import CommonLayout from '../components/Layout/CommonLayout';

import useMainData from '../hooks/useMainData';

function MainPage() {
  const { allRepo, recommendRepo, likedRepo, recommendCategory } = useMainData();

  let setting = (repo) => {
    return {
      dots: false,
      infinite: repo.length > 4 ? true : false,
      speed: 500,
      slidesToShow: repo.length > 4 ? 5 : repo.length,
      slidesToScroll: 1,
      arrows: true,
      prevArrow: <SlideButton type="prev" />,
      nextArrow: <SlideButton type="next" />,
      drag: true,
    };
  };

  return (
    <>
      <CommonLayout>
        <MainContentSlider />
        <Divider />
        <div style={{ padding: '3rem', paddingTop: '1rem' }}>
          <TitleWrapper>
            <ExpandingText text="모든 지도 목록" count={allRepo.length} />
          </TitleWrapper>
          <Slider {...setting(allRepo)}>
            {allRepo.map((card) => (
              <Card card={card} key={card.id} />
            ))}
          </Slider>
          {/* 좋아요한 지도가 있을 경우만 렌더 */}
          {likedRepo.length > 0 && (
            <>
              <TitleWrapper>
                <ExpandingText text="좋아요한 지도 목록" count={likedRepo.length} />
              </TitleWrapper>
              <Slider {...setting(likedRepo)}>
                {likedRepo.map((card) => (
                  <Card card={card} key={card.id} />
                ))}
              </Slider>
            </>
          )}
          {/* */}
          {recommendRepo && (
            <>
              {recommendRepo.map((repo, idx) => (
                <>
                  <TitleWrapper>
                    <ExpandingText
                      text={`${recommendCategory[idx]} 카테고리 목록`}
                      count={repo.length}
                    />
                  </TitleWrapper>
                  <Slider {...setting(repo)}>
                    {repo.map((card) => (
                      <Card card={card} key={card.id} />
                    ))}
                  </Slider>
                </>
              ))}
            </>
          )}
        </div>
      </CommonLayout>
    </>
  );
}

export default MainPage;

const TitleWrapper = styled.div`
  display: flex;
  vertical-align: bottom;
  line-height: 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 4% 1.7rem 1rem;
`;
