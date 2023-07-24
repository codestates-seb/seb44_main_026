import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import moment from 'moment';
import 'moment/locale/ko';
import API from '../../../api/index';
import { type } from 'os';
import { useState } from 'react';
import EditComment from './EditComment';

interface CommentProps {
  name: any;
  body: string;
  point: number;
  createdAt: number[];
  id: number;
}

const CommentBox: React.FC<CommentProps> = ({
  name,
  body,
  point,
  createdAt,
  id,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [comment, setComment] = useState(body);
  //멤버아이디 비교해서 멤버아이디가 맞으면 수정 삭제 표시 나중에 수정
  //const memberId = 33;
  const memberId = localStorage.getItem('memberId');
  const loginAccToken = localStorage.getItem('accessToken');
  const newDate = new Date(
    createdAt[0],
    createdAt[1] - 1,
    createdAt[2],
    createdAt[3] + 9,
    createdAt[4],
    createdAt[5],
  );

  const newCreatedAt = moment(newDate.toISOString());

  const deleteComment = async () => {
    try {
      const res = await API.DELETE({
        url: `https://ok.greennare.store/nare/reply/${id}`,
        headers: {
          Authorization: loginAccToken,
        },
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    location.reload();
  };

  return (
    <DivContainer>
      {isEdit ? (
        <EditComment
          setnewComment={setComment}
          newComment={comment}
          id={id}
          setIsEdit={setIsEdit}
        />
      ) : (
        <>
          <InfoContainer>
            <div className="member-name">{'🐥 '}</div>
            <div className="member-point">{'🏆 ' + point + '점'}</div>
            {newCreatedAt ? (
              <div className="comment-date">
                {'⏱️ ' + moment(newCreatedAt).fromNow()}
              </div>
            ) : null}
            <>
              {memberId == name ? (
                <>
                  <div className="edit-button" onClick={() => setIsEdit(true)}>
                    수정
                  </div>
                  <div className="del-button" onClick={deleteComment}>
                    삭제
                  </div>
                </>
              ) : null}
            </>
          </InfoContainer>
          <BodyContainer>{body}</BodyContainer>
        </>
      )}
    </DivContainer>
  );
};

export default CommentBox;

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  padding: 1rem 2rem;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
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
    cursor: pointer;
    display: flex;
    &:hover {
      background-color: var(--green-100);
      color: white;
    }
  }
  .edit-button {
    position: absolute;
    top: 0;
    right: 3rem;
    padding: 0.5rem;
    font-size: 13px;
    cursor: pointer;
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
