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

reidb.insert=(word, times, type, example1, link1, example2, link2, example3, link3, image1, image2, image3, english, spanish)=>{
    return new Promise((resolve, reject)=> {
        pool.query('INSERT INTO `Rei`.`Word` (`word`, `times_Searched`, `word_Type`, `example1`, `example1link`, `example2`, `example2link`, `image1`, `image2`, `image3`, `english`, `spanish`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [word], [times], [type], [example1], [link1], [example2], [link2], [example3], [link3], [image1], [image2], [image3], [english], [spanish], (err, results)=> {
            if(err){
                return reject(err);
            }
            return resolve('Correctamente insertado');
        });
    });
};


module.exports= reidb;