import React from 'react';
import { styled } from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';

interface CommentProps {
  name: string;
  body: string;
  point: number;
  createdAt: string;
}

const CommentBox: React.FC<CommentProps> = ({
  name,
  body,
  point,
  createdAt,
}) => {
  return (
    <DivContainer>
      <InfoContainer>
        <div className="member-name">{'🐥 ' + name}</div>
        <div className="member-point">{point + '점'}</div>
        <div className="comment-date">{'⏱️' + moment(createdAt).fromNow()}</div>
        <div className="del-button">삭제</div>
      </InfoContainer>
      <BodyContainer>{body}</BodyContainer>
    </DivContainer>
  );
};

export default CommentBox;

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem 2rem;
  border: 1px solid var(--green-300);
  border-radius: 0.5rem;
`;

const InfoContainer = styled.div`
  display: flex;
  position: relative;
  .member-name {
    font-size: 18px;
    margin-right: 1rem;
    margin-bottom: 0.5rem;
  }
  .member-point {
    font-size: 12px;
    margin-right: 1rem;
  }
  .comment-date {
    font-size: 12px;
  }
  .del-button {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.5rem;
    font-size: 13px;
    border-radius: 4px;
    display: flex;
    &:hover {
      background-color: var(--green-100);
      color: white;
    }
  }
`;

const BodyContainer = styled.div`
  display: flex;
  font-size: 15px;
`;
