const mysql=require('mysql');
const express=require('express');
const path=require('path');
const { Http2ServerRequest } = require('http2');

const app=express();
app.use(express.json());

//MYSQL connection
const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'soumua@123',
    database: 'mycollege'
});

db.connect((err)=>{
    if(err) throw err;
    console.log('connectd to MYSQL');

});

//serve HTML form
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
});

app.use(express.urlencoded({extended:true}));
//insert student
app.post('/students',(req,res)=>{
    const {id,name}=req.body;
    const sql='INSERT INTO student (id,name) VALUES (?,?)';
    db.query(sql,[id,name],(err,result)=>{
        if(err)
            console.error('Error inserting data',err);
        console.log('Inserted student',id);
        res.send('student successfilly added to the DB');
    });
});

//start server
app.listen(3000,()=>{
    console.log('API running at http://localhost:3000');
});

app.get('/students',(req,res)=>{
    const sql='SELECT * FROM students';
    db.query(sql,(err,results)=>{
        if (err) throw err;
        //build a HTML table
        let html=`
            <h2>All students</h2>
            <table border="1" cellpadding="8"cellspacing="0">
    });
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                </tr>
                `;
            results.forEach(row =>{
                html +=`
                <tr> 
                    <td>${row.id}</td>
                    <td>${row.name}</td>
                </tr>
                `;

            });
            html +='</table><br><a href="/"Back to Form</a>';
    });
});