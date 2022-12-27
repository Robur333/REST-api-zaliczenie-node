//plik  appki z opcjami

//importuje expressa
const { Router } = require('express');
const express = require('express');

//tworze expressa
const app = express();

//importuje loggera
const morgan = require("morgan");

//uruchamiam lo0gera 

//
//const morgan 
//routy

const polutionRouters =require("./api/routers/polutions");
app.use("/polutions", polutionRouters);

app.use((req,res) => 
{
    res.status(200).json({wiadomosc: "wszystko śmiga"})
});

const router = express.Router();


//wyciąga router z expressa
router.post("/" ,(req,res)=>{
    res.status(201).json({wiadomosc:"dodano nowy odczyt jakości powietrza"})
});
router.get("/", (req,res)=> {
    res.status(200).json({wiadomosc: "Lista wszystkich odczytów"})
});


router.get("/:id", (req,res)=>{
    const id = req.params.id;
    req.status(200).json({wiadomosc: "zmiana danych pomiaru o nr"+id})
} );
router.get("/:id", (req,res)=>{
    const id = req.params.id;
    req.status(200).json({wiadomosc: "usunięcie pomiaru o nr"+id})
} );
module.exports = router;