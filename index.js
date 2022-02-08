const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({
  connectionString: 'postgres://fzapzlcjzkwilq:a667ec9042bf9f11970470cd8c6ed9e4e8894e1b93860da79938f33f65797f41@ec2-34-205-46-149.compute-1.amazonaws.com:5432/daaql0jlc1tlfs',
  ssl: {
    rejectUnauthorized: false
  }
})

var app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Main Page
app.get('/', async (req, res) => {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM rect')
    const results = { 'results': (result) ? result.rows : null}
    res.render('pages/main', results)
    client.release()
  } catch (err) {
    res.send(err);
  }
})
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

//Add Rectangle 
app.post('/addRect', (req,res)=>{
  console.log('post request for /addRect');
  const {
      uname,
      width,
      height,
      perimeter,
      area,
      color
    } = req.body;
    
    var query = `
      INSERT INTO rect
      VALUES ('${uname}', ${width}, ${(height)}, ${(perimeter)}, ${area}, '${(color)}');
      `;

    pool.query(query, (error, result) => {
      if(error)
        res.send(error)
      else{
        res.redirect('/')
      }
    });
});

// Delete Rectangle
app.post('/delRect', (req,res) => {
  var query = `DELETE FROM rect WHERE uname='${req.body.delName}'`
  pool.query(query, (error,result) => {
    if(error)
      res.send(error)
    else{
      res.redirect('/')
    }
  })
})
/*app.get('/rect-database/:uname', (req,res)=> {
    var getUserQuery = `SELECT FROM * rect WHERE uname='${req.params.uname}'`;
    pool.query(getUserQuery, (error, result)=>{
        if(error)
            res.send(error);
        var results = {'results' : result.rows};
        res.render('pages/db', results);
    })
})*/


