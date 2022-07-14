const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const usersRouter = require('./routes/auth.js');
const indexRouter = require('./routes');
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

app.use('/api/auth', usersRouter);
app.use('/', indexRouter);

app.listen(process.env.PORT || 8080, (err) => {
    if (err) {
        console.log('err 발생');
    }

    console.log('정상구동');
});