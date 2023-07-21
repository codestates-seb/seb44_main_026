import React, { useEffect } from 'react';
import styled from 'styled-components';
import API from '../../../api/index';

interface EditCommentProps {
  setnewComment: (newcomment: string) => void;
  newComment: string;
  id: number;
  setIsEdit: (isEdit: boolean) => void;
}

const EditComment: React.FC<EditCommentProps> = ({
  setnewComment,
  newComment,
  id,
  setIsEdit,
}) => {
  const textHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setnewComment(e.currentTarget.value);
  };
  const loginAccToken = localStorage.getItem('accessToken');
  const EditComment = async () => {
    try {
      const res = await API.PATCH({
        url: `https://ok.greennare.store/nare/reply/${id}`,
        data: { content: newComment },
        headers: {
          Authorization: loginAccToken,
        },
      });
    } catch (err) {
      console.log(err);
    }

    alert('댓글이 수정되었습니다.');
    location.reload();
  };

  useEffect(() => {
    console.log(newComment);
  }, [newComment]);

  return (
    <InputContainer>
      <input
        onChange={textHandler}
        className="input-content"
        value={newComment}
        placeholder="댓글을 수정하세요"
      ></input>
      <InputButton onClick={EditComment}>등록</InputButton>
    </InputContainer>
  );
};

export default EditComment;

const InputContainer = styled.div`
  display: flex;
  margin-left: 1rem;
  margin-bottom: 1rem;
  input {
    width: 90%;
    height: 2rem;
    padding: 1rem;
    border-radius: 0.5rem;
    border: none;
    box-shadow: rgba(0, 0, 0, 0.3) 1px 1px 4px;
  }
  input::placeholder {
    color: var(--gray);
  }
`;

const InputButton = styled.div`
  display: flex;
  background-color: var(--green-100);
  border-radius: 0.5rem;
  font-size: 13px;
  align-items: center;
  justify-content: center;
  margin: 0rem 0.5rem;
  color: white;
  width: 10%;
  &:hover {
    background-color: var(--green-200);
  }
`;
