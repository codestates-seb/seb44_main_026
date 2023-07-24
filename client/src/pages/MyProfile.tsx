import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import API from '../api/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { Slide } from 'react-awesome-reveal';
import logoimg from '../assets/img/logo.png';
import loadimg from '../assets/img/loading.gif';
import { DummyCList, DummyRList } from 'components/MyPage/DummyList';
import MyList from 'components/MyPage/MyList';
import EditProfile from 'components/MyPage/EditProfile';

const MyProfile = () => {
  const [loading, setloading] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const loginAccToken = localStorage.getItem('accessToken');
  const [point, setPoint] = useState(0);

  const getProfile = async () => {
    try {
      setloading(true);
      const res = await API.GET({
        url: `https://ok.greennare.store/user/info`,
        headers: {
          Authorization: loginAccToken,
        },
      });
      console.log(res);
      setUserName(res?.data.data.name);
      setUserEmail(res?.data.data.email);
      setPoint(res?.data.data.point);
    } catch (err) {
      console.log(err);
    }
    setloading(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getProfile();
  }, []);

  const GotoEdit = () => {
    setIsEdit(!isEdit);
    window.scrollTo(0, 0);
  };

  return (
    <DivContainer>
      {loading ? (
        <img src={loadimg} className="loading"></img>
      ) : (
        <>
          {!isEdit && (
            <Banner>
              <Slide direction={'left'} duration={1000} triggerOnce={true}>
                <h1>Welcome ! {userName} 😊</h1>
              </Slide>
            </Banner>
          )}
          <h2>☘️ My Profile</h2>
          <ProfileContainer>
            <FontAwesomeIcon icon={faUser} className="user-icon" />
            <InfoWrapper>
              <div className="user-name">
                {userName + ' '}
                <FontAwesomeIcon icon={faPenToSquare} onClick={GotoEdit} />
              </div>
              <div className="user-email">{userEmail}</div>
              <div className="user-point">{'🏆 ' + point + ' 점'}</div>
            </InfoWrapper>
          </ProfileContainer>
          {!isEdit ? (
            <ListContainer>
              <SingleContainer>
                <h2>🧩 내가 작성한 챌린지</h2>
                {DummyCList.slice(0, 3).map((item, index) => (
                  <MyList item={item} key={index + 'clist'}></MyList>
                ))}
              </SingleContainer>
              <SingleContainer>
                <h2>🧩 내가 작성한 리뷰</h2>
                {DummyRList.slice(0, 3).map((item, index) => (
                  <MyList item={item} key={index + 'rlist'}></MyList>
                ))}
              </SingleContainer>
            </ListContainer>
          ) : (
            <EditProfile
              username={userName}
              isEdit={isEdit}
              setUserName={setUserName}
              setIsEdit={setIsEdit}
            />
          )}
        </>
      )}
    </DivContainer>
  );
};

export default MyProfile;

const DivContainer = styled.div`
  h2 {
    margin-left: 5rem;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15rem;
    margin: 0 auto;
  }
`;

const Banner = styled.div`
  display: flex;
  background-color: white;
  padding: 3rem;
  margin-left: 3rem;
  h1 {
    color: var(--green-300);
  }
`;

const ProfileContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  border-radius: 1rem;
  display: flex;
  //border: 1px solid black;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  .user-icon {
    height: 6rem;
    background-color: var(--green-200);
    padding: 2rem;
    color: white;
    border-radius: 100%;
    margin-right: 2rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .user-name {
    font-size: 29px;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  .user-email {
    display: flex;
    text-align: center;
    align-items: center;
  }
  .user-point {
    font-size: 18px;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  margin: 0 auto;
  border-radius: 1rem;
  margin-bottom: 2rem;
  display: flex;
  margin-top: 1rem;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  align-items: center;
  justify-content: center;
`;

const SingleContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-top: 1rem;
  margin-bottom: 1rem;
  h2 {
    margin-left: 2rem;
  }
`;
