import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SlideItem from './SlideItem';
import { DummyItem } from './DummyItem';
import API from '../../api/index';

const MainSlide = () => {
  const [items, setItems] = useState([]);
  const getItem = async () => {
    try {
      const res = await API.GET({
        url: 'https://ok.greennare.store/green?size=3&page=1&category=all',
      });
      console.log(res);
      setItems([...res?.data.data]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return (
    <StyledSlide>
      <HeadLine>
        <h1>🔥이 주 HOT 상품🔥</h1>
      </HeadLine>
      <DivConatiner>
        {items.slice(0, 3).map((el, idx) => (
          <SlideItem item={el} key={idx} />
        ))}
      </DivConatiner>
    </StyledSlide>
  );
};

export default MainSlide;

const StyledSlide = styled.div`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const HeadLine = styled.div`
  margin-bottom: 1rem;
  margin-top: 3rem;
  h1 {
    display: flex;
    justify-content: center;
    margin: 0 auto;
  }
`;

const DivConatiner = styled.div`
  border-radius: 1rem;
  display: flex;
  flex-direction: row;
  padding: 1rem;
  width: 80%;
  margin: 0 auto;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;
