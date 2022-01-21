const jsonServer = require('json-server');
const auth = require('json-server-auth');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const e = require('express');

const app = jsonServer.create();
const router = jsonServer.router('db.json');

app.db = router.db;

app.use(jsonServer.bodyParser)
app.use(cors());

app.post('/check-password', (req, res) => {
    let response = bcrypt.compareSync(req.body.currentPassword, req.body.hash);
    if (response) {
        return res.status(200).json({ response: response });
    }
    else {
        console.log('Rrrr,', response);
        return res.status(401).json({ response: response });
    }
})

app.use(auth);
app.use(router);
app.listen(3500);

