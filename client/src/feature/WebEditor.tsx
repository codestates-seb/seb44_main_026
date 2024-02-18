import 'react-quill/dist/quill.snow.css';
import API from '../api/index';
import { AxiosError } from 'axios';
import { useRef, useState, useMemo, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { styled } from 'styled-components';

interface EditorProps {
  contents: string;
  setContents: (content: string) => void;
}

export const EditorComponent: React.FC<EditorProps> = ({
  contents,
  setContents,
}) => {
  const QuillRef = useRef<ReactQuill>();

  useEffect(() => {
    console.log(contents);
  }, [contents]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }, { color: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
        ],
      },
    }),
    [],
  );

  return (
    <DivContainer>
      <ReactQuill
        ref={(element) => {
          if (element !== null) {
            QuillRef.current = element;
          }
        }}
        value={contents}
        onChange={setContents}
        modules={modules}
        theme="snow"
        placeholder="내용을 입력해주세요."
        className="quill"
      />
    </DivContainer>
  );
};

const DivContainer = styled.div`
  .quill {
    height: 15rem;
    padding: 0;
  }
`;
