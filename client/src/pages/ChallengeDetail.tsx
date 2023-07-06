import React from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/index';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import loadimg from '../assets/img/loading.gif';

const ChallengeDetail = () => {
  const id = useParams().id;
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setloading] = useState(false);
  const comment = 1;
  const getChallenge = async () => {
    try {
      setloading(true);
      const res = await API.GET(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );
      console.log(res);
      setTitle(res.data.title);
      setBody(res.data.body);
    } catch (err) {
      console.log(err);
    }
    setloading(false);
  };
  useEffect(() => {
    getChallenge();
  }, []);

  return (
    <DivContainer>
      <HeadLine>
        <h1>🦄 상세 게시판</h1>
      </HeadLine>
      <ItemContainer>
        {loading && <img src={loadimg}></img>}
        <TitleContainer>{title}</TitleContainer>
        {!loading && <hr />}
        <BodyContainer>{body}</BodyContainer>
      </ItemContainer>
      <CommentContainer>
        <CommentTitle>참여 댓글 {comment}개</CommentTitle>
        <Comments>댓글</Comments>
      </CommentContainer>
    </DivContainer>
  );
};

export default ChallengeDetail;

const DivContainer = styled.div`
  margin: 0 auto;
  width: 80%;
`;

const HeadLine = styled.div`
  display: flex;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

const ItemContainer = styled.div`
  border: 1px solid black;
  border-radius: 0.5rem;
  img {
    display: flex;
    margin: 0 auto;
    margin-top: 6rem;
    margin-bottom: 3rem;
  }

  hr {
    width: 95%;
    margin: 0 auto;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  margin: 1.5rem;
  margin-left: 3rem;
  font-size: 21px;
`;

const BodyContainer = styled.div`
  display: flex;
  margin: 1rem;
  margin-left: 3rem;
  font-size: 16px;
`;

const CommentContainer = styled.div``;

const CommentTitle = styled.div`
  font-size: 20px;
  margin: 1rem;
`;

const Comments = styled.div`
  border: 1px solid black;
  border-radius: 0.5rem;
`;
