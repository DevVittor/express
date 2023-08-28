const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const User = require("./models/User");
const Login = require("./models/Login");
const bcrypt = require("bcrypt");

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

app.get("/register",(req,res)=>{
    res.render("Register")
})

app.post("/register/save",async(req,res)=>{
    var myEmail = req.body.email;
    var myPassword = req.body.password;

    const salt = bcrypt.genSaltSync(16);
    const hash = bcrypt.hashSync(myPassword,salt);


    try{
        const registrar = await Login.create({
            email:myEmail,
            password: hash
        });
        console.log(registrar);
        res.redirect("/");
    }catch(error){
        console.error(error)
    };
});
app.get("/login",(req,res)=>{
    res.render("Login");
})

app.post("/login/save",async(req,res)=>{
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;
    try{
        const idUser = await Login.findOne({
            where:{email:loginEmail,password:loginPassword},
            attributes:['email','password']
        });
        if(idUser.email && idUser.password){
            
            const email =await idUser.email;
            const senha = await idUser.password;

            console.log(`Foi encontrado com sucesso o email ${email} com a senha ${senha}`);
            res.redirect("/");
        }
    }catch(error){
        console.error(`Não foi encontrado nada no banco de dados e causou esse error ${error}`);
        res.redirect("/");
    }
});

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Servidor rodando na porta ${port}`);
});