import { SetStateAction } from "react";
import styled from 'styled-components';

type Comment = {
  id: number;
  inputValue: string;
};

type CommentProps = {
  id: number;
  item: Comment;
  isEdit: Comment | null;
  setIsEdit: React.Dispatch<SetStateAction<Comment | null>>;
  handleDelete: (id: number) => void;
  newBody: string;
  setNewBody: React.Dispatch<SetStateAction<string>>;
  setComments: React.Dispatch<SetStateAction<Comment[]>>;
  comments: Comment[];
};


export const Comment = ({
  id,
  item,
  isEdit,
  setIsEdit,
  handleDelete,
  newBody,
  setNewBody,
  setComments,
  comments,
}: CommentProps) => {
  //編集したいidとCommentsの配列の要素のidが一緒だった時isEditModeをtrueにする
  const isEditMode = isEdit && item.id === isEdit.id;

  //findでcommentsの配列からidの同じ要素をとってくる
  //どのstateにidが入っているものがあるかはconsole.logして見つける
  //編集したい要素のidとcommentsの中にあるidが同じものを取り出して定数にいれる
  //取り出したidとinputValueが入っている要素のinputValueに編集してsetした値を代入する
  const handleSave = () => {
    if (!isEdit) {
      return;
    }
    // const newComment = comments.find((element) => element.id === isEdit.id);
    // if (!newComment) return;
    // newComment.inputValue = newBody;

    // const newArray = comments.filter((c) => c.id !== isEdit.id);
    // setComments([...newArray, newComment]);

    const newArray = comments.map((c) => {
      if (c.id === isEdit.id) {
        c.inputValue = newBody;
        return c;
      }
      return c;
    });

    setComments(newArray);

    // console.log('xxx', comId);
  };

  return (
    //isEditModeがtrueの時
    <>
      {isEditMode ? (
        //SEditInputのtextareaタグに代わってその中のvalueにstringが入る
        //onChangeで変更した値をnewBodyにセットする
        //setIsEditでisEditModeの切り替え、確定ボタンを押したらisEditModeはfalseになる
        <>
          <SEditInput value={newBody} onChange={(e) => setNewBody(e.target.value)} rows={10} cols={40}>
            {/* <DeleteButton onClick={() => handleDelete(c.id)}>削除</DeleteButton> */}
          </SEditInput>
          <SEditButton
            onClick={() => {
              setIsEdit(null);
              handleSave();
            }}
          >
            {'確定'}
          </SEditButton>
          {console.log('ccc', newBody)}
          {console.log('@@@', isEdit)}
        </>
      ) : (
        //isEditModeがfalseの時(編集ボタンを押してない時)
        //CommentListElementの内側にcomments配列の要素のinputValueと編集ボタンと削除ボタンを表示する
        //isEditModeを切り替えるために編集ボタンを押したときにisEditにcomments配列の要素itemをセットしてisEditModeをtrueにする
        //comments配列の要素itemのinputValueが変更されていないのにinputValueをセットしているから変更が反映されない
        <CommentListElement>
          <p>{item.inputValue}</p>
          <EditButton
            onClick={() => {
              {
                console.log('zzz', item.inputValue);
              }
              {
                console.log('yyy', item.inputValue);
              }
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
const SEditButton = styled.button`
width: 4.5%;
height: 4%;
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