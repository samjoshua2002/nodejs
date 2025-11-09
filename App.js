const exp = require('express');
const morgan = require('morgan');

const app = exp();

// app.use((req, res, next) => {
//     console.log('Request received:', req.method, req.url,req.path);
//     next();
// });
app.use(morgan('dev'));

app.get('/', (req, res) => {
//   res.status(200).send("./docs/index.html");
res.status(200).sendFile(__dirname + '/docs/index.html');
});
app.get('/about', (req, res) => {
    res.status(200).sendFile(__dirname + '/docs/About.html');
});
app.get("/aboutus",(req,res)=>{
    res.redirect(301,'/about');
});
app.use((req,res)=>{
    res.status(404).sendFile(__dirname + '/docs/Notfound.html');
})

app.listen(3000);