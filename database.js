const sqlite3 = require('sqlite3').verbose()


let sql

const db = new sqlite3.Database('private/Database/fotoflask.db',sqlite3.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err.message);
});

// db.run(`DROP TABLE if exists user_details`);
// db.run(`DROP TABLE if exists user_password`);

sql = `create table if not exists user_details(user_id INTEGER primary key AUTOINCREMENT, username, email, mobilenumber, DOB date, profile_src, cover_src)`;
db.run(sql, (err)=>{
    if(err) return console.error("A"+err.message);
})

sql = `insert into user_details values(?,?,?,?,?,?,?)`;
//db.run(sql,["C001","poojyanth","poojyanth@gmail.com",9666033306,"2004-02-10","poojyanth.jpg"])
// db.run(sql,["C002","abhiram","abhiram@gmail.com",9666033306,"2004-02-10","abhiram.jpg"])
// db.run(sql,["C003","sravan","sravan@gmail.com",9666033306,"2004-02-10","sravan.jpg"])
// db.run(sql,["C004","saipavan","saipavan@gmail.com",9666033306,"2004-02-10","saipavan.jpg"])
// db.run(sql,["C005","gowtham","gowtham@gmail.com",9666033306,"2004-02-10","gowtham.jpg"])

sql = `select * from user_details order by user_id`
// db.all(sql, (err,rows)=>{
//     if(err) return console.error("B"+error.message);
//     rows.forEach((row) => {
//         console.log(row);
//     })
// })

sql = `create table if not exists user_password(user_id INTEGER primary key AUTOINCREMENT, username, password)`;
db.run(sql, (err)=>{
    if(err) return console.error("C"+err.message);
});


sql = `create table if not exists `

sql = `insert into user_password values(?,?,?)`
// db.run(sql,["C001","poojyanth","poojyanth"])
// db.run(sql,["C002","abhiram","abhiram"])
// db.run(sql,["C003","sravan","sravan"])
// db.run(sql,["C004","saipavan","saipavan"])
// db.run(sql,["C005","gowtham","gowtham"])
// db.run(sql,["C006","ppu","ppp"])



sql = `select * from user_details`
db.all(sql, (err,rows)=>{
    if(err) return console.error("D"+err.message);
    rows.forEach((row) => {
        console.log(row);
    })
})

sql = `select * from user_password`
db.all(sql, (err,rows)=>{
    if(err) return console.error("D"+err.message);
    rows.forEach((row) => {
        console.log(row);
    })
})

sql = `select * from user_password where username = ?`
// db.all(sql,["ppu"], (err,rows)=> {
//     if(err) return console.error(err.message);
//     console.log(row.password);
//     // rows.forEach((row) => {
//     //         })
// })



//   lastID property stores the value of the last inserted row ID.
// changes property stores the rows affected by the query.

//Inserting the array into sql statement
// let languages = ['C++', 'Python', 'Java', 'C#', 'Go'];
// let placeholders = languages.map((language) => '(?)').join(',');
// let sql = 'INSERT INTO langs(name) VALUES ' + placeholders;
// console.log() === INSERT INTO langs(name) VALUES (?),(?),(?),(?),(?)

// async function getChannelFromID(db, id) {
//     return new Promise((resolve, reject) => {
//         db.get(`SELECT * FROM '${id}' where username='abhiram'`,(err, row) => {
//             if (err) reject(err); // I assume this is how an error is thrown with your db callback
//             resolve(row.channel);
//         });
//     });
// }

// Now you can use the function like this
// (make sure you mark the function you call this in as async)
// const xyz = getChannelFromID(db, "user_password");
// console.log(xyz)


//DELETE ALL ITEMS
// sql =  `DELETE FROM user_password`
// db.run(sql,(err)=>{
//     if(err)console.error(err.message)
// })
// sql = `DELETE from user_details`
// db.run(sql,(err)=>{
//     if(err)console.error(err.message)
// })


// sql = `insert into user_password(username,password) values("Poojyanth Reddy","poojyanth")`
// db.run(sql,(err)=>{
//     if(err) console.error(err.message)
// })


















db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });