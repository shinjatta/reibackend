const mysql = require('mysql');

const pool= mysql.createPool({
    connectionLimit: 10,
    password: 'root',
    user: 'root',
    database: 'rei',
    host: '127.0.0.1',
    port: 8889,
});

let reidb= {};

reidb.all=()=>{
    return new Promise((resolve, reject)=> {
        pool.query('SELECT * FROM rei.search', (err, results)=> {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};

reidb.ranking=()=>{
    return new Promise((resolve, reject)=> {
        pool.query('SELECT word, COUNT(word) AS total FROM rei.search GROUP BY word ORDER BY 2 DESC LIMIT 10', 
        (err, results)=> {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};


reidb.ultimos=()=>{
    return new Promise((resolve, reject)=> {
        pool.query('SELECT * FROM Rei.Word INNER JOIN Rei.Search ON Rei.Word.word = Rei.Search.word ORDER BY Search.search_date DESC LIMIT 8;', 
        (err, results)=> {
            if(err){
                return reject(err);
            }
            return resolve(results);
        });
    });
};



reidb.one=(word)=>{
    return new Promise((resolve, reject)=> {
        pool.query('SELECT * FROM Rei.Word WHERE word = ?', [word], (err, results)=> {
            if(err){
                return reject(err);
            }
            return resolve(results[0]);
        });
    });
};

reidb.log=(busqueda)=>{
  return new Promise((resolve, reject)=> {
    let propiedades=[busqueda.word, busqueda.search_date];
    const queryString = 'INSERT INTO `Rei`.`Search` (`word`, `search_date`) VALUES (?, ?);';
      pool.query(queryString, propiedades, (error, results, fields)=> {
          if(error){
              return reject(error);
          }
          const data = {results, fields};
          return resolve(data);
      });
  });
};

reidb.newWord=(palabra)=>{
  return new Promise((resolve, reject)=> {
      let propiedades=[palabra.word, palabra.times_Searched, palabra.word_Type, palabra.example1, palabra.example1link, palabra.example2, palabra.example2link, palabra.image1, palabra.image2, palabra.image3, palabra.english, palabra.spanish];
    const queryString = "INSERT INTO `Rei`.`Word` (`word`, `times_Searched`, `word_Type`, `example1`, `example1link`, `example2`, `example2link`, `image1`, `image2`, `image3`, `english`, `spanish`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
      pool.query(queryString, propiedades, (error, results, fields)=> {
          if(error){
              return reject(error);
          }
          const data = {results, fields};
          return resolve(data);
      });
  });
};

module.exports= reidb;