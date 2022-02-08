const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
var pool;
pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
})

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  var getQuery = `SELECT * FROM rect`;
  pool.query(getQuery, (error, result)=>{
    if(error)
      res.end(error);
    var results = {'results': result.rows};
    res.render('pages/main', results);
  });
});
//app.get('/', (req, res) => res.render('pages/index'));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

/*app.get('/rect-database/:uname', (req,res)=> {
    var getUserQuery = `SELECT FROM * rect WHERE uname='${req.params.uname}'`;
    pool.query(getUserQuery, (error, result)=>{
        if(error)
            res.send(error);
        var results = {'results' : result.rows};
        res.render('pages/db', results);
    })
})


app.post('/addRect', (req,res)=>{
    console.log('post request for /addRect');
    const {
        uname,
        rec_id,
        width,
        height,
        perimeter,
        area,
        color
      } = req.body;
      
      var query = `
        INSERT INTO rect
        VALUES ('${uname}', ${rec_id}, ${width}, ${(height)}, ${(perimeter)}, ${area}, '${(color)}');
        `;
  
      pool.query(query, (error, result) => {
        if(error)
            res.end(error)
        var results = {'results': result.rows}
        res.render('pages/db',results);
      });
  
});
*/
