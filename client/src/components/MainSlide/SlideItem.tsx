import React from 'react';
import { MainList } from './DummyItem';
import { styled } from 'styled-components';
import sample from '../../assets/img/logo.png';

interface SItemProps {
  item: {
    productName: string;
    price: string;
    detail: string;
    createdAt: string;
    point: number;
  };
}

const SlideItem: React.FC<SItemProps> = ({ item }) => {
  return (
    <StyledWrapper>
      <div className="img-slide">
        <img src={sample} />
      </div>
      <div className="text-container">
        <div>{item.productName}</div>
        <div>{item.detail}</div>
      </div>
    </StyledWrapper>
  );
};

export default SlideItem;

const StyledWrapper = styled.div`
  display: flex;
  margin: 1rem;
  width: 100%;
  background-color: aliceblue;
  .text-container {
    display: flex;
    flex-direction: column;
  }
`;
