import React from 'react';
import { styled } from 'styled-components';
import ChallengeItem from './ChallengeItem';
import API from '../../api/index';
import { useEffect, useState } from 'react';
import loadimg from '../../assets/img/loading.gif';
import { Pagination } from '../../feature/Pagination';

const ChallengeList = () => {
  const [challengeList, setChallengeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const getChallenge = async () => {
    try {
      setLoading(true);
      const res = await API.GET(
        `http://greennarealb-281283380.ap-northeast-2.elb.amazonaws.com/nare/challenge?&size=${postPerPage}&page=${
          currentPage - 1
        }`,
      );
      console.log(res?.data.data);
      console.log(res?.data.pageInfo);
      setChallengeList([...res?.data.data]);
      setTotal(res?.data.pageInfo.totalPages);
    } catch (err) {
      console.log(err);
      setChallengeList([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getChallenge();
  }, []);

  useEffect(() => {
    console.log(currentPage);
    getChallenge();
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <ListWrapper>
      {loading && (
        <div className="loading">
          <img src={loadimg}></img>
        </div>
      )}
      {challengeList.map((item) => (
        <ChallengeItem item={item} key={item.challengeId} />
      ))}
      <Pagination total={total} page={currentPage} setPage={setCurrentPage} />
    </ListWrapper>
  );
};

export default ChallengeList;

const ListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 3rem;
  .loading {
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin-top: 10rem;
  }
`;
