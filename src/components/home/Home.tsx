import { SetStateAction, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Comment } from './Comment';
import axios from 'axios';

type CommentType = {
  id: string;
  inputValue: string;
};
// type AddInputValueType = {
//   commentInputValue: string;
//   editTodoName: string;
// }

export const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [comments, setComments] = useState<CommentType[]>([]);
  // const [edit, setEdit] = useState<string>('編集');
  const [isEdit, setIsEdit] = useState<CommentType | null>(null);
  const [newBody, setNewBody] = useState<string>('');

  //useRefのhooks作成
    const endOfPostsRef = useRef<HTMLDivElement | null>(null);

    //useRefの関数の発火のためのuseEffect
    useEffect(() => {
      if (endOfPostsRef.current) {
        endOfPostsRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [comments])
  

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setInputValue(event.target.value);
  };

  const getInputValues = async () => {
    try {
      const response = await fetch('http://localhost:3001/');
      const data = await response.json();
      setComments(data.comments);
      // console.log('data', data); //コンソールした
      // console.log('data.com', data.comments); //コンソールした
    } catch (error) {
      console.error('エラー', error);
    }
  };

  // useEffect(() => {
  //   getInputValues();
  // }, []);

  //ポストを押したときに走る処理
  const handleClick = async () => {
    if (inputValue === '') {
      alert('コメントを入力してください');
      return;
    }
    // const { inputValue } = event;
    //入力欄に書いていた内容がinputValue
    // console.log('inputValue', inputValue);
    await axios.post('http://localhost:3001/add', { data: inputValue });
    // .then((response) =>
    // {const newInputArray: CommentType[]  = comments.filter((comment) => {comment.id})
    // setComments(newInputArray)
    // console.log('aaaaa', { data: { inputValue } })
    // );

    getInputValues().then((response) => {
      return response;
    });

    // , {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ inputValue }),
    // }
    // const data = await response

    // .then((response) => {
    //   const comment = response;
    //   setComments([...comments]);
    //   console.log('ccc', comment); //コンソールした
    // })
    // .catch((response) => {
    //   console.log('エラー！', response);
    // });

    //書いてたテキストエリアの内容をテキストエリアから消す処理
    let textareaForm = document.getElementById('form')! as HTMLInputElement;
    textareaForm.value = '';
    setInputValue('');
  };

  //デリート処理
  const handleDelete = async (id: string) => {
    await axios.delete('http://localhost:3001/delete', { data: { id } }).then((response) => {
      getInputValues();
      // const newCommentList = comments.filter((value) => value.id !== id);
      // setComments(newCommentList);
    });
  };

  useEffect(() => {
    getInputValues();
    // axios
    //   .get('http://localhost:3001')
    //   .then((response) => {
    //     if (response.statusText !== 'OK') {
    //       throw new Error('通信失敗');
    //     }

    //     getInputValues();
    //   })
    //   .catch((e) => {
    //     console.log(e.message);
    //   });
  }, []);

  // console.log('sss', comments);
  return (
    <Container>
      {comments.length > 0 && (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
              minHeight: 'calc(99.4vh - 16%)',
              maxHeight: 'calc(99.4vh - 16%)',
              position: 'absolute',
              top: 0,
              overflowX: 'hidden',
              overflowY: 'auto',
              gap: '0.5rem',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: '100%',
                position: 'absolute',
                top: 0,
                gap: '0.5rem',
                padding: '1rem',
              }}
            >
              {comments.map((c) => (
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
                  id={c.id}
                  getInputValues={getInputValues}
                />
              ))}
              <div ref={endOfPostsRef}></div>
            </div>
          </div>
        </>
      )}
      <InputText
        id="form"
        rows={10}
        cols={40}
        placeholder="コメントを入力して下さい"
        onChange={handleChange}
      ></InputText>
      <AddCommentButton onClick={handleClick}>ポスト</AddCommentButton>
    </Container>
  );
};

const Container = styled.div`
  width: 75%;
  height: 99.4vh;
  border: 2px solid gray;
  background: #ddd;
  align-items: center;
  // margin-left: auto;
  // margin-right: auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: flex-end;
  position: relative;
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
  // position: fixed;
`;
const AddCommentButton = styled.button`
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
  // position: fixed;
  &:hover {
    background: #5a79ba;
    color: #fff;
    transition: 0.2s;
  }
`;

export default Home;
