import React, { SyntheticEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/index';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import loadimg from '../assets/img/loading.gif';
import { InputItem } from 'components/Challenge/Detail/Comment';
import { dummyComment } from 'components/Challenge/Detail/DummyComment';
import CommentBox from 'components/Challenge/Detail/CommentBox';
import ChallengeList from 'components/Challenge/ChallengeList';
import { Pagination } from '../feature/Pagination';

const ChallengeDetail = () => {
  const id = useParams().id; //챌린지 아이디
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [name, setName] = useState('');
  const [loading, setloading] = useState(false); //데이터 받아올 때 로딩
  const [comment, setComment] = useState(''); //새로 작성할 댓글 내용
  const [commentList, setCommentList] = useState([]);
  const memberId = localStorage.getItem('memberId');
  const [commentCount, setCommentCount] = useState(0);
  const [admin, setAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [img, setImg] = useState('');
  const postPerPage = 10;
  const loginAccToken = localStorage.getItem('accessToken');
  const [total, setTotal] = useState(0);
  const [isReady, setIsReady] = useState(true);
  const [point, setPoint] = useState(0);

  const getChallenge = async () => {
    try {
      setloading(true);
      const res = await API.GET({
        url: `https://ok.greennare.store/nare/${id}`,
      });
      console.log(res);
      setTitle(res?.data.data.title);
      setBody(res?.data.data.content);
      setName(res?.data.data.name);
      setImg(res?.data.data.image);
      if (memberId == res?.data.data.memberId) {
        setAdmin(true);
      }
    } catch (err) {
      console.log(err);
    }
    setloading(false);
  };

  const deleteChallenge = async () => {
    try {
      setloading(true);
      const res = await API.DELETE({
        url: `https://ok.greennare.store/nare/${id}`,
        headers: {
          Authorization: loginAccToken,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    setloading(false);
    navigate('/challenge');
  };

  const getComment = async () => {
    try {
      setloading(true);
      const res = await API.GET({
        url: `https://ok.greennare.store/nare/reply/${id}?size=${postPerPage}&page=${
          currentPage - 1
        }`,
      });
      console.log(res);

      setCommentList([...res?.data.data]);
      setCommentCount(res?.data.pageInfo.totalElements);
      setTotal(res?.data.pageInfo.totalPages);
    } catch (err) {
      console.log(err);
    }
    setloading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getChallenge();
    getComment();
  }, []);

  useEffect(() => {
    getComment();
    window.scrollTo(0, 0);
  }, [currentPage]);

  const goToEdit = () => {
    navigate(`/challenge/edit/${id}`);
  };

  const addDefaultImg = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src =
      'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg';
  };

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
              <div className="detail-title">
                <h2>{title}</h2>
              </div>
              <div className="subtitle-container">
                <div className="detail-writer">{name}</div>
                {admin ? (
                  <>
                    <div className="edit-page" onClick={goToEdit}>
                      수정하기
                    </div>
                    <div className="delete-page" onClick={deleteChallenge}>
                      삭제하기
                    </div>
                  </>
                ) : null}
              </div>
            </TitleContainer>
            <BodyContainer>
              <div dangerouslySetInnerHTML={{ __html: body }}></div>
              {img ? (
                <img
                  src={`https://ok.greennare.store${img}`}
                  onError={addDefaultImg}
                  width={500}
                  height={400}
                />
              ) : null}
            </BodyContainer>
          </ItemContainer>
          <CommentContainer>
            <CommentTitle>참여 댓글 {commentCount}개</CommentTitle>
            {loginAccToken ? (
              <InputItem setComment={setComment} value={comment} />
            ) : null}
            {commentList.map((item: any, index: any) => (
              <CommentBox
                name={item.memberId}
                id={item.replyId}
                body={item.content}
                point={item.point}
                createdAt={item.createdAt}
                key={index}
              ></CommentBox>
            ))}
            <Pagination
              total={total}
              page={currentPage}
              setPage={setCurrentPage}
            />
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
  .edit-page {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5%;
    &:hover {
      color: var(--green-100);
    }
  }
  .delete-page {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 1rem;
    &:hover {
      color: var(--green-100);
    }
  }
  .detail-writer {
    display: flex;
    font-size: 13px;
    margin: 0.5rem 0rem;
    margin-left: 3rem;
  }
  .subtitle-container {
    display: flex;
    margin-top: 0.5rem;
    font-size: 13px;
  }
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  margin-left: 3rem;
  font-size: 21px;
`;

const CommentContainer = styled.div``;

const CommentTitle = styled.div`
  font-size: 20px;
  margin: 1rem;
  margin-top: 2rem;
`;
