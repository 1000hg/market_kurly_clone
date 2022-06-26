const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));

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

app.listen(process.env.PORT || 8080, (err) => {
    if (err) {
        console.log('err 발생');
    }

    console.log('정상구동');
});