import React from 'react';
import { MainList } from './DummyItem';
import { styled } from 'styled-components';
import sample from '../../assets/img/logo.png';

interface SItemProps {
  item: {
    productName: string;
    price: string;
    name: string;
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
        <div className="slide-name">
          <h3>{item.productName}</h3>
        </div>
        <div>{item.price}</div>
      </div>
    </StyledWrapper>
  );
};

export default SlideItem;

const StyledWrapper = styled.div`
  display: flex;
  margin: 1rem;
  width: 100%;
  .text-container {
    display: flex;
    padding: 1rem;
    width: 100%;
    flex-direction: column;
  }
  .slide-name {
    margin-bottom: 0.5rem;
  }
`;
