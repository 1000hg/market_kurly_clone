const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const authRouter = require('./routes/auth.js');
const verifyRouter = require('./routes/verify.js');
const usersRouter = require('./routes/users.js');
dotenv.config();

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.get('/api/list', (req, res) => {
    res.json([
        { id: 'test1', name: '테스트1' },
        { id: 'test2', name: '테스트2' },
        { id: 'test3', name: '테스트3' },
        { id: 'test4', name: '테스트4' },
    ]);
});

app.get('/api/item', (req, res) => {
    res.json({
        id: 'test1',
        name: '테스트1'
    });
});

// 회원가입 및 로그인 생성, 토큰발행
app.use('/api/auth', authRouter);
// id 및 비밀번호 찾기
app.use('/api/verify', verifyRouter);
// 회원 비밀번호 재설정
app.use('/api/user', usersRouter);

app.listen(process.env.PORT || 8080, (err) => {
    if (err) {
        console.log('err 발생');
    }

    console.log('정상구동');
});