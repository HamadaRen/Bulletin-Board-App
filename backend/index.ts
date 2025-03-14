import { Response } from 'express';
import cors from 'cors';
import { uid } from 'uid';
const express = require('express');

const mysql = require('mysql2');

//bodyのエラーが出なくなった
const app = express();
const PORT = 3001;

app.use(express.json()); // 追加
// app.use(express.urlencoded({ extended: true })); // 追加
// app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'renren1704',
  database: 'Comments',
});

app.get('/', (req: Request, res: Response) => {
  console.log('getリクエストを受け付けました');
  const sql = 'SELECT * FROM comment';
  connection.query(sql, (error: any, result: string) => {
    if (error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(200).json({ comments: result });
    }
  });
});

type RequestBody = {
  inputValue: string;
};

//query文を書かないとデータベースに登録されない
app.post('/add', (req: Request, res: Response) => {
  console.log('postリクエストを受け付けました');
  
  if (req.body === null) {
    return;
  }
  // const inputValue = JSON.parse(req.body);
  const requestBody: any = req.body;
  const uidValue = uid(5);
  const inputValue = requestBody.data;
  
  const insertQuery = 'INSERT INTO comment (id, inputValue) VALUES (?, ?)';
  connection.query(insertQuery, [uidValue, inputValue], (error: string, result: string) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'comment!!の追加に失敗しました' });
    }
    res.status(200).json({ comment: result });
  });
});

app.delete('/delete', (req: Request, res: Response) => {
  console.log('deleteリクエストを受け付けました');

  const commentId: any = req.body;
  const inputId = commentId.id as string;
  const deleteQuery = `DELETE FROM comment WHERE id = "${inputId}"`;
  connection.query(deleteQuery, (error: string, result: string) => {
    if (error) {
      console.error('MySQLエラー', error);
      return res.status(500).json({ error: 'commentの削除に失敗しました' });
    }
    res.status(200).json(result);
  });
});

app.put('/put', (req: Request, res: Response) => {
  console.log('putリクエストを受け取りました');

  const requestBody: any = req.body;
  const inputId = requestBody.id as string;
  const newInputValue = requestBody.inputValue as string;
  const updateQuery = `UPDATE comment SET inputValue=? WHERE id = "${inputId}"`;
  connection.query(updateQuery, [newInputValue], (error: string, result: string) => {
    if(error){
      console.error("MySQLエラー", error);
      return res.status(500).json({ error: 'comment!の更新に失敗しました'});
    }
    res.status(200).json(result);
  })
})

try {
  app.listen(PORT, () => {
    console.log(`server running at://localhost:${PORT}`);
  });
} catch (e) {
  if (e instanceof Error) {
    console.error(e.message);
  }
}
