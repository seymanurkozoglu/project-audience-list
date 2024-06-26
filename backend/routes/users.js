const express = require('express')
const router = express.Router();
const db = require('../db')
const cors = require('cors')

const app = express();
app.use(cors());

router.get("/tags", (req, res) => {
    const q = "SELECT name FROM tags"
    db.query(q, (err, data) => {
        if (err) return res.json();
        return res.json(data)
    })
})


router.get("/audience-list",(req,res)=>{
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

router.get("/audience-list-search",(req,res)=>{
        const search = req.query.search
        const tag = req.query.tag
        const status = req.query.status

        let sql = `SELECT users.id, users.name,JSON_ARRAYAGG(tags.name) AS tags,users.status,users.created_at 
                     FROM users INNER JOIN users_to_tags ON (users.id = users_to_tags.user_id) 
                     INNER JOIN tags ON (tags.id = users_to_tags.tag_id)  
                     WHERE users_to_tags.user_id IN(SELECT user_id FROM users_to_tags GROUP BY user_id)
                     GROUP BY users_to_tags.user_id,users.name 
                    `

        if(search !== 'undefined' && search !== null && search !== '' && tag === 'undefined' && status === 'undefined'){
            sql += `HAVING JSON_ARRAYAGG(tags.name) LIKE '%${search}%' OR users.name LIKE '%${search}%' OR status='${search}'`
        }
        else if(search !== 'undefined' && search !== null && search !== '' && tag !== 'undefined' && status !== 'undefined'){
            sql += `HAVING JSON_ARRAYAGG(tags.name) LIKE '%${tag}%' AND users.name LIKE '%${search}%' AND status='${status}'`
        }
        else if(search !== 'undefined' && search !== null && search !== '' && tag !== 'undefined'){
            sql += `HAVING JSON_ARRAYAGG(tags.name) LIKE '%${tag}%' AND users.name LIKE '%${search}%'`
        }
        else if(search !== 'undefined' && search !== null && search !== '' && status !=='undefined'){
            sql += `HAVING  users.name LIKE '%${search}%' AND status='${status}'`
        }
         else{
             if(tag !== 'undefined' && status !== 'undefined' && (search === 'undefined ' || search !== null || search !== ''))
                 sql += `HAVING JSON_ARRAYAGG(tags.name) LIKE '%${tag}%' AND status='${status}'`
             else{
                 if(tag !== 'undefined')
                     sql += `HAVING JSON_ARRAYAGG(tags.name) LIKE '%${tag}%'`
                 if(status !== 'undefined')
                     sql += `HAVING status='${status}'`
             }
         }

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

module.exports = router;
