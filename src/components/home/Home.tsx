import { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Comment } from './Comment';
import axios from 'axios';

type Comment = {
  id: number;
  inputValue: string;
};

export const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  // const [edit, setEdit] = useState<string>('編集');
  const [isEdit, setIsEdit] = useState<Comment | null>(null);
  const [newBody, setNewBody] = useState<string>('');

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setInputValue(event.target.value);
    console.log('aaa', event.target.value);
  };

  const handleClick = (event: { preventDefault: () => void }) => {
    if (inputValue === '') {
      alert('コメントを入力してください');
      return;
    }
    event.preventDefault();
    let textareaForm = document.getElementById('form')! as HTMLInputElement;
    textareaForm.value = '';
    const newComments: Comment = {
      id: Date.now(),
      inputValue: inputValue,
    };
    setComments([...comments, newComments]);
    setInputValue('');
  };

  const handleDelete = (id: number) => {
    const newCommentList = comments.filter((value) => value.id !== id);
    setComments(newCommentList);
  };

  console.log('bbb', comments);

  useEffect(() => {
    axios
      .get('http://localhost:3000')
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  return (
    <Container>
      {comments.length > 0 &&
        comments.map((c) => (
          <Comment
            key={c.id}
            item={c}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            handleDelete={handleDelete}
            newBody={newBody}
            setNewBody={setNewBody}
            setComments={setComments}
            comments={comments}
            id={0}
          />
        ))}
      <InputText
        id="form"
        rows={10}
        cols={40}
        placeholder="コメントを入力して下さい"
        onChange={handleChange}
      ></InputText>
      <AddComment onClick={handleClick}>ポスト</AddComment>
    </Container>
  );
};

const Container = styled.div`
  width: 75%;
  height: 100vh;
  border: 2px solid gray;
  background: #ddd;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  justify-content: flex-end;
`;
const InputText = styled.textarea`
  width: 50%;
  height: 5%;
  padding: 10px;
  border: 3px solid #000;
  position: absolute;
  bottom: 5%;
  left: 18%;
  border-radius: 10px;
  background: #fff;
  position: fixed;
`;
const AddComment = styled.button`
  width: 10%;
  height: 9%;
  cursor: pointer;
  border: 2px solid #5a79ba;
  background: #b0c4de;
  border-radius: 15px;
  position: absolute;
  bottom: 5%;
  left: 70%;
  font-size: 5%;
  font-weight: bold;
  margin: 0 3%;
  position: fixed;
  &:hover {
    background: #5a79ba;
    color: #fff;
    transition: 0.2s;
  }
`;

export default Home;
