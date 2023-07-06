import styled from 'styled-components';

interface InputItemProps {
  setComment: (comment: string) => void;
  value: string;
}

const InputItem: React.FC<InputItemProps> = ({ setComment, value }) => {
  const textHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setComment(e.currentTarget.value);
  };

  return (
    <InputContainer>
      <input
        onChange={textHandler}
        className="input-content"
        value={value}
        placeholder="댓글을 달고 챌린지에 참여해보세요!"
      ></input>
      <InputButton>등록</InputButton>
    </InputContainer>
  );
};
/*
interface TextareaItemProps {
  setBody: (body: string) => void;
  title: string;
  value: string;
}

const TextareaItem: React.FC<TextareaItemProps> = ({ setBody, value }) => {
  const textHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.currentTarget.value);
  };

  return (
    <TextareaContainer>
      <textarea
        onChange={textHandler}
        className="modify-textarea-content"
        value={value}
      ></textarea>
    </TextareaContainer>
  );
};
*/
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
/*
const TextareaContainer = styled.section`
  display: grid;
  grid-row-gap: 3px;
  padding: 20px;
  background-color: var(--white);
  .title {
    font-weight: 600;
  }
  .help {
    width: 100%;
    font-size: 12px;
  }
  .modify-textarea-content {
    width: 98%;
    height: 200px;
  }
  border: 1px solid var(--black-075);
  border-radius: 3px;
`;*/
export { InputItem };
