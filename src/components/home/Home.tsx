import { SetStateAction, useState } from 'react';
import styled from 'styled-components';
import { idText } from 'typescript';

type Comment = {
  id: number;
  inputValue: string;
};

export const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [edit, setEdit] = useState<string>('編集');
  const [isEdit, setIsEdit] = useState<Comment | null>(null);

  const [newBody, setNewBody] = useState<string>('');

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setInputValue(event.target.value);
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

  const handleEdit = (id: number, inputValue: string) => {
    {
      edit === '編集' ? setEdit('確定') : setEdit('編集');
    }
    if (edit === '確定') {
      if (inputValue === '') {
        return alert('コメントが入力されていません');
      }
      const newCommentList = comments.map((comment) => {
        if (comment.id === id) {
          comment.inputValue = inputValue;
        }
        console.log('ccc', inputValue);
        return comment;
      });
      setInputValue('');
      setComments(newCommentList);
      let textareaForm = document.getElementById('form')! as HTMLInputElement;
      textareaForm.value = '';
    }
  };
  console.log('aaa', comments);

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
          />
          // <CommentList key={c.id}>
          //   <p>{c.inputValue}</p>
          //   {isEdit.id === c.id ? (
          //     <form>
          //       <textarea rows={10} cols={40}>
          //         <EditButton onClick={() => handleEdit(c.id, inputValue)}>{edit}</EditButton>
          //         <DeleteButton onClick={() => handleDelete(c.id)}>削除</DeleteButton>
          //       </textarea>
          //     </form>
          //   ) : (
          //     <>
          //       <EditButton onClick={() => handleEdit(c.id, inputValue)}>{edit}</EditButton>
          //       <DeleteButton onClick={() => handleDelete(c.id)}>削除</DeleteButton>
          //     </>
          //   )}
          // </CommentList>
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

type CommentProps = {
  item: Comment;
  isEdit: Comment | null;
  setIsEdit: React.Dispatch<SetStateAction<Comment | null>>;
  handleDelete: (id: number) => void;
  newBody: string;
  setNewBody: React.Dispatch<SetStateAction<string>>;
};
const Comment = ({ item, isEdit, setIsEdit, handleDelete, newBody, setNewBody }: CommentProps) => {
  //編集したいidとCommentsの配列の要素のidが一緒だった時isEditModeをtrueにする
  const isEditMode = isEdit && item.id === isEdit.id;
  return (
    //isEditModeがtrueの時
    <>
      {isEditMode ? (
        //SEditInputのtextareaタグに代わってその中のvalueにstringが入る
        //onChangeで変更した値をnewBodyにセットする
        <>
          <SEditInput value={newBody} onChange={(e) => setNewBody(e.target.value)} rows={10} cols={40}>
            {/* <DeleteButton onClick={() => handleDelete(c.id)}>削除</DeleteButton> */}
          </SEditInput>
          <SEditButton onClick={() => setIsEdit(null)}>{'確定'}</SEditButton>
        </>
      ) : (
        //isEditModeがfalseの時(編集ボタンを押してない時)
        //CommentListElementの内側にcomments配列の要素のinputValueと編集ボタンと削除ボタンを表示する
        //isEditModeを切り替えるために編集ボタンを押したときにisEditにcomments配列の要素itemをセットしてisEditModeをtrueにする
        //comments配列の要素item
        <CommentListElement>
          <p>{item.inputValue}</p>
          <EditButton
            onClick={() => {
              setIsEdit(item);
              setNewBody(item.inputValue);
            }}
          >
            {'編集'}
          </EditButton>
          <DeleteButton onClick={() => handleDelete(item.id)}>削除</DeleteButton>
        </CommentListElement>
      )}
    </>
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
const CommentListElement = styled.div`
  border: 1px solid #000;
  background: #fff;
  width: 80%;
  height: 20%;
  border-radius: 7px;
  font-size: 75%;
  margin: 3px auto;
  position: relative;
  bottom: 20%;
  border: 2px solid #000;
`;
const DeleteButton = styled.button`
width: 5%;
height: 20%;
font-size: 7px;
position: relative;
left: 89%;
top: 45%;
border: 0.5px solid #ba2636;
background: #c9171e;
color: #fff;
border-radius: 5px;
cursor: pointer;
&:hover {
    background: #fff;
    color: #ba2636;
    transition: 0.2s;
    font-weight: bold;
`;
const EditButton = styled.button`
width: 5%;
height: 20%;
font-size: 7px;
position: relative;
left: 89%;
top: 45%;
border: 0.5px solid #9ea1a3;
background: #c0c6c9;
color: #000;
border-radius: 5px;
cursor: pointer;
&:hover {
    background: #7b7c7d;
    color: #fff;
    transition: 0.2s;
    font-weight: bold;
`;

const SEditInput = styled.textarea`
  border: 1px solid #000;
  background: #fff;
  width: 80%;
  height: 20%;
  border-radius: 7px;
  font-size: 75%;
  margin: 3px auto;
  position: relative;
  bottom: 20%;
  border: 2px solid #000;
`;
const SEditButton = styled.textarea`
width: 3%;
height: 3%;
font-size: 7px;
position: relative;
left: 85%;
bottom: 25%;
border: 0.5px solid #9ea1a3;
background: #c0c6c9;
color: #000;
border-radius: 5px;
cursor: pointer;
&:hover {
    background: #7b7c7d;
    color: #fff;
    transition: 0.2s;
    font-weight: bold;
`;
export default Home;
