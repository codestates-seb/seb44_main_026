import React from 'react';
import { styled } from 'styled-components';
import ChallengeItem from './ChallengeItem';
import API from '../../api/index';
import { useEffect, useState } from 'react';
import loadimg from '../../assets/img/loading.gif';

const ChallengeList = () => {
  const [challengeList, setChallengeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const getChallenge = async () => {
    try {
      setLoading(true);
      const res = await API.GET('https://jsonplaceholder.typicode.com/posts');
      setChallengeList([...res.data]);
    } catch (err) {
      console.log(err);
      setChallengeList([]);
    }
    setLoading(false);
  };

  const indexOfLast = currentPage * postPerPage;
  const indexOfFirst = indexOfLast - postPerPage;
  const currentPosts = (posts: any) => {
    let currentPosts = 0;
    currentPosts = posts.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  };

  useEffect(() => {
    getChallenge();
  }, []);

  useEffect(() => {
    console.log(currentPage);
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
