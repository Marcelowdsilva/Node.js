const express = require('express');
const app = express()
const bodyParser = require("body-parser")
const connection = require("./database/database")
const articlesController = require("./articles/ArticlesController");
const categoriesController = require("./categories/CategoriesController");
const Article = require("./articles/Article")
const Category = require("./categories/categories")


// view engine
app.set("view engine","ejs")

// static
app.use(express.static('public'))

// bodyParser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// database

connection
    .authenticate()
        .then(()=>{
            console.log("Conexão feita com o banco")
        }).catch((erro)=>{
            console.log(erro)
        })

app.use("/",categoriesController);
app.use("/",articlesController);

app.get("/", (req,res)=>{
    Article.findAll({
        order:[
            ['id','DESC']  // ordenando em forma decrescente
        ]
    }).then(articles =>{
        Category.findAll().then(categories =>{
            res.render("index",{articles: articles, categories: categories})
        })        
    })
});

app.get("/:slug", (req,res)=>{
    let slug = req.params.slug
    Article.findOne({
        where:{
            slug: slug
        }
    }).then(article =>{        
        if(article != undefined){
            Category.findAll().then(categories =>{
                res.render("article",{article: article, categories: categories})
            }) 
        }else{
            res.redirect("/")
        }
    }).catch(err =>{
        res.redirect("/")
    })
})

app.listen(8080,()=>{
    console.log("Servidor rodando")
})