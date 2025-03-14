import axios from 'axios';
import { SetStateAction } from 'react';
import styled from 'styled-components';

type Comment = {
  id: string;
  inputValue: string;
};
// type AddInputValueType = {
//   inputValue: string;
//   editCommentName: string;
// };

type CommentProps = {
  id: string;
  item: Comment;
  isEdit: Comment | null;
  setIsEdit: React.Dispatch<SetStateAction<Comment | null>>;
  handleDelete: (id: string) => void;
  newBody: string;
  setNewBody: React.Dispatch<SetStateAction<string>>;
  setComments: React.Dispatch<SetStateAction<Comment[]>>;
  comments: Comment[];
  getInputValues: () => Promise<void>;
};

export const Comment = ({
  id,
  item,
  isEdit,
  setIsEdit,
  handleDelete,
  newBody,
  setNewBody,
  getInputValues,
  setComments,
  comments,
}: CommentProps) => {
  //編集したいidとCommentsの配列の要素のidが一緒だった時isEditModeをtrueにする
  const isEditMode = isEdit && item.id === isEdit.id;

  //findでcommentsの配列からidの同じ要素をとってくる
  //どのstateにidが入っているものがあるかはconsole.logして見つける
  //編集したい要素のidとcommentsの中にあるidが同じものを取り出して定数にいれる
  //取り出したidとinputValueが入っている要素のinputValueに編集してsetした値を代入する
  const handleSave = async (inputValue: string) => {
    // const editCommentName: string = inputValue
    if (!isEdit) {
      return;
    }
    await axios
      .put('http://localhost:3001/put', { data: { id: isEdit.id, inputValue: inputValue } })
      .then((response) => {
        // console.log('レスポンスデータ',response.data);
        // const newArray = comments.map((c) => {
        //   if (c.id === isEdit.id) {
        //     c.inputValue = newBody;
        //     return c;
        //   }
        //   return c;
        // });
        // setComments(newArray);
        getInputValues();
        setIsEdit(null);
      });
  };

  return (
    //isEditModeがtrueの時
    <>
      {isEditMode ? (
        //SEditInputのtextareaタグに代わってその中のvalueにstringが入る
        //onChangeで変更した値をnewBodyにセットする
        //setIsEditでisEditModeの切り替え、確定ボタンを押したらisEditModeはfalseになる
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: "relative" }}>
          <SEditInput value={newBody} onChange={(e) => setNewBody(e.target.value)} rows={10} cols={40}>
            {/* <DeleteButton onClick={() => handleDelete(c.id)}>削除</DeleteButton> */}
          </SEditInput>
          <SEditButton
            onClick={() => {
              setIsEdit(null);
              handleSave(newBody);
            }}
          >
            {'確定'}
          </SEditButton>
        </div>
      ) : (
        //isEditModeがfalseの時(編集ボタンを押してない時)
        //CommentListElementの内側にcomments配列の要素のinputValueと編集ボタンと削除ボタンを表示する
        //isEditModeを切り替えるために編集ボタンを押したときにisEditにcomments配列の要素itemをセットしてisEditModeをtrueにする
        //comments配列の要素itemのinputValueが変更されていないのにinputValueをセットしているから変更が反映されない
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', position: "relative" }}>
        <CommentListElement>
          <p>{item.inputValue}</p>
        </CommentListElement>
          <EditButton
            onClick={() => {
              setIsEdit(item);
              setNewBody(item.inputValue);
            }}
          >
            {'編集'}
          </EditButton>
          <DeleteButton onClick={() => handleDelete(item.id)}>削除</DeleteButton>
        </div>
      )}
    </>
  );
};

const CommentListElement = styled.div`
  border: 1px solid #000;
  background: #fff;
  width: 80%;
  height: 5rem;
  border-radius: 7px;
  font-size: 75%;
  /* margin: 3px auto; */
  position: relative;
  /* bottom: 20%; */
  border: 2px solid #000;
  overflow-y: auto;
  white-space: pre-wrap;
`;
const DeleteButton = styled.button`
  width: 2.5rem;
  height: 1rem;
  font-size: 7px;
  position: absolute;
  bottom: 0.1rem;
  right: 11.5%;
  border: 1.4px solid #ba2636;
  background: #f2a0a1;
  color: #a22041;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #ba2636;
    color: #fff;
    font-weight: bold;
    transition: 0.3s;
    font-weight: bold;
  }
`;
const EditButton = styled.button`
  width: 2.5rem;
  height: 1rem;
  font-size: 7px;
  position: absolute;
  bottom: 0.1rem;
  right: 20%;
  border: 1.4px solid #7b7c7d;
  background: #c0c6c9;
  color: #000;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #7b7c7d;
    color: #fff;
    transition: 0.3s;
    font-weight: bold;
  }
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
const SEditButton = styled.button`
  width: 2.5rem;
  height: 1rem;
  font-size: 7px;
  position: absolute;
  bottom: 10%;
  right: 11%;
  border: 0.5px solid #9ea1a3;
  background: #c0c6c9;
  color: #000;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: #7b7c7d;
    color: #fff;
    transition: 0.3s;
    font-weight: bold;
  }
`;
export default Comment;
