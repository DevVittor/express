const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const User = require("./models/User");

require("./database/conn");
require("dotenv").config();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use('/favicon.png', express.static("public/favicon.png"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", async (__, res) => {
    try {
        const title = {
            title:'Inicio'
        }
        const data = await User.findAll({
            order:[['id','DESC']]
        });
        res.render("Home", { data,title });
    } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        res.render("Home", { data: [] });
    }
});

app.get("/form",(__,res)=>{
    const title = {
        title: 'Formulário'
    }
    res.render("Form",{title:title});
});

app.get("/removeId",(req,res)=>{
    res.render("Remove");
});

app.post("/delete",async(req,res)=>{
    const id = req.body.id;
    try{
        const info = await User.findOne({
            where:{id:id} 
        });
        info ? info.destroy() : res.redirect('/');
        res.redirect('/');
    }catch(error){
        console.error(error);
    }
});

app.post("/save",(req,res)=>{
    const {name,age,height} = req.body;
    User.create({
        name:name,
        age:age,
        height:height
    }).then(()=>{
        res.redirect("/");
    }).catch(error=>console.log(`Não deu por causa disso ${error}`));
});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`);
});