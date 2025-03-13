import { SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Comment } from './Comment';
import axios from 'axios';

type Comment = {
  id: number;
  inputValue: string;
};
// type AddInputValueType = {
//   commentInputValue: string;
//   editTodoName: string;
// }

export const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  // const [edit, setEdit] = useState<string>('編集');
  const [isEdit, setIsEdit] = useState<Comment | null>(null);
  const [newBody, setNewBody] = useState<string>('');

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setInputValue(event.target.value);
  };

  const getInputValues = async () => {
    try{
      const response = await fetch("http://localhost:3001/");
      console.log('getレスポンス', response);
      const data = await response.json();
      console.log('aaa', data) //コンソールした
      setComments(data);
      console.log('bbb', comments) //コンソールしたした
    } catch(error) {
      console.error('エラー', error)
    }
  }

  useEffect(() => {
    getInputValues()
  }, [])


  //ポストを押したときに走る処理
  const handleClick = async () => {
    if (inputValue === "") {
      alert('コメントを入力してください');
      return;
    }
    // const { inputValue } = event;
    //入力欄に書いていた内容がinputValue
    await axios
    .post("http://localhost:3001/add", {data: { inputValue }})
    .then((response) => {
      console.log('ccc',response);
      const comment = response.data;
      setComments((preComments => [comment, ...preComments]))
    })
    .catch((response) => {
      console.log('エラー！', response);
    })

    //書いてたテキストエリアの内容をテキストエリアから消す処理
    let textareaForm = document.getElementById('form')! as HTMLInputElement;
    textareaForm.value = '';
    const newComments = {
      id: Date.now(),
      inputValue: inputValue,
    };
    setComments([...comments, newComments]);
    setInputValue('');
    console.log('fff', comments)
  };

  const handleDelete = async (id: number) => {
    console.log(id)
    
    await axios
    .delete("http://localhost:3001/delete", {data: {id}})
    .then((response) => {
      const newCommentList = comments.filter((value) => value.id !== id);
      setComments(newCommentList);
    })
  };
  
  
  
  
  useEffect(() => {
    axios
    .get('http://localhost:3001')
    .then((response) => {
      console.log(response);
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
