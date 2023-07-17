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

  const getChallenge = async () => {
    try {
      setLoading(true);
      const res = await API.GET('https://jsonplaceholder.typicode.com/posts');
      const newData = [...res.data];
      setChallengeList(newData.slice((currentPage - 1) * 10, currentPage * 10));
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

  useEffect(() => {
    console.log(challengeList);
  }, [challengeList]);

  return (
    <ListWrapper>
      {loading && (
        <div className="loading">
          <img src={loadimg}></img>
        </div>
      )}
      {challengeList.map((item) => (
        <ChallengeItem item={item} key={item.id} />
      ))}
      <Pagination total={10} page={currentPage} setPage={setCurrentPage} />
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
