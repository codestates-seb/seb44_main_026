import React from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/index';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import loadimg from '../assets/img/loading.gif';
import { InputItem } from 'components/Challenge/Detail/Comment';
import { dummyComment } from 'components/Challenge/Detail/DummyComment';
import CommentBox from 'components/Challenge/Detail/CommentBox';

const ChallengeDetail = () => {
  const id = useParams().id; //챌린지 아이디
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setloading] = useState(false); //데이터 받아올 때 로딩
  const [comment, setComment] = useState(''); //새로 작성할 댓글 내용
  const commentCount = 0;

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
    window.scrollTo(0, 0);
    getChallenge();
  }, []);

  return (
    <DivContainer>
      <HeadLine>
        <h1>🦄 참여하기</h1>
      </HeadLine>
      {loading ? (
        <img src={loadimg} className="loading"></img>
      ) : (
        <>
          <ItemContainer>
            <TitleContainer>
              <div className="detail-title">{title}</div>
              <div className="detail-writer">작성자:김철수 Date</div>
            </TitleContainer>
            <BodyContainer>{body}</BodyContainer>
          </ItemContainer>
          <CommentContainer>
            <CommentTitle>참여 댓글 {commentCount}개</CommentTitle>
            <InputItem setComment={setComment} value={comment} />
            {dummyComment.map((item: any, index: any) => (
              <CommentBox
                name={item.memberId}
                body={item.body}
                point={item.point}
                createdAt={item.createdAt}
                key={index}
              ></CommentBox>
            ))}
          </CommentContainer>
        </>
      )}
    </DivContainer>
  );
};

export default ChallengeDetail;

const DivContainer = styled.div`
  margin: 0 auto;
  width: 80%;
  .loading {
    display: flex;
    margin: 0 auto;
    padding: 10rem;
  }
`;

const HeadLine = styled.div`
  display: flex;
  margin-bottom: 1rem;
  margin-top: 2rem;
  margin-left: 1rem;
`;

const ItemContainer = styled.div`
  border: 1px solid var(--gray-100);
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
  flex-direction: column;
  .detail-title {
    margin-top: 1.5rem;
    margin-left: 3rem;
    font-size: 21px;
  }
  .detail-writer {
    display: flex;
    font-size: 13px;
    margin: 0.5rem 0rem;
    margin-left: 3rem;
  }
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
  margin-top: 2rem;
`;
