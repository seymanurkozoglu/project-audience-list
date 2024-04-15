import express from 'express';
import mysql from 'mysql';
import cors from 'cors';


const app = express();
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Zr71GH0ndJyOPWv",
    database: "project_db"
})

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Zr71GH0ndJyOPWv' ;

app.get("/tags", (req, res) => {
    const q = "SELECT name FROM tags"
    db.query(q, (err, data) => {
        if (err) return res.json();
        return res.json(data)
    })
})

app.get("/users",(req,res)=>{
    const sql = "SELECT * FROM users"
    db.query(sql,(err,data)=>{
        if(err) return res.json()
        return res.json(data)
    })
})

app.get("/audience-list",(req,res)=>{
    const search = req.query.search
    const tag = req.query.tag
    const status = req.query.status

    const sql = `SELECT users.id, users.name,JSON_ARRAYAGG(tags.name) AS tags,users.status,users.created_at 
    FROM users INNER JOIN users_to_tags ON (users.id = users_to_tags.user_id) 
    INNER JOIN tags ON (tags.id = users_to_tags.tag_id)  
    WHERE users_to_tags.user_id IN(SELECT user_id FROM users_to_tags GROUP BY user_id) 
    GROUP BY users_to_tags.user_id,users.name`

    db.query(sql,(err,data)=>{
        if(err) return res.json()
        else{
            var userArrayList= [];
            for(var i=0 ; i<data.length ; i++){
                var usersObject= { id : data[i].id , name : data[i].name , tags : JSON.parse(data[i].tags) , status : data[i].status , created_at : data[i].created_at};
                userArrayList.push(usersObject)
            }
            return res.json(userArrayList)
        }
       
    })
})

app.get("/audience-list-search",(req,res)=>{
        const search = req.query.search
        const tag = req.query.tag
        const status = req.query.status

        let sql = `SELECT users.id, users.name,JSON_ARRAYAGG(tags.name) AS tags,users.status,users.created_at 
                     FROM users INNER JOIN users_to_tags ON (users.id = users_to_tags.user_id) 
                     INNER JOIN tags ON (tags.id = users_to_tags.tag_id)  
                     WHERE users_to_tags.user_id IN(SELECT user_id FROM users_to_tags GROUP BY user_id)
                     GROUP BY users_to_tags.user_id,users.name 
                     HAVING JSON_ARRAYAGG(tags.name) LIKE '%${tag!==undefined ? tag : search}%' OR users.name LIKE '%${search}%' OR status='${status!== undefined ? status : search}'
                  `

        // if(search !== undefined)
        //     sql += `HAVING JSON_ARRAYAGG(tags.name) LIKE '${tag ? tag : search}' OR users.name LIKE '%${search}%' OR status='${status ? status : search}' LIMIT 10`
        // else{
        //     if(tag && status)
        //         sql += `HAVING JSON_ARRAYAGG(tags.name) LIKE '${tag}' AND status='${status}' LIMIT 10`
        //     else{
        //         if(tag)
        //             sql += `HAVING JSON_ARRAYAGG(tags.name) LIKE '%${tag}%'`
        //         if(status)
        //             sql += `HAVING status='${status}' LIMIT 10`
        //     }

        // }

        console.log(sql);


        db.query(sql,(err,data)=>{
            if(err) return res.json()
            else{
                var userArrayList= [];
                for(var i=0 ; i<data.length ; i++){
                    var usersObject= { id : data[i].id , name : data[i].name , tags : JSON.parse(data[i].tags) , status : data[i].status , created_at : data[i].created_at};
                    userArrayList.push(usersObject)
                }
                return res.json(userArrayList)
            }
           
        })
})


app.use("/",(req,res)=>{
    res.send("Server is running.")
})

app.listen(5000, () => {
    console.log('Connected to backend!');
})