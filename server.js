const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

let ranking = [];
let logs = [`[SISTEMA] Console iniciado em ${new Date().toLocaleTimeString('pt-BR')}`];

// Banco de Dados de Questões
const db = {
"7": [{q:"Blue+Yellow?",o:["Green","Red","Black"],c:0},{q:"Big?",o:["Tall","Small","Short"],c:1},{q:"I ___ student",o:["is","am","are"],c:1},{q:"Pai?",o:["Mother","Brother","Father"],c:2},{q:"Cats plural?",o:["Cats","Cates","Caties"],c:0},{q:"Fruit?",o:["Car","Apple","Table"],c:1},{q:"10+5?",o:["Twelve","Fifteen","Twenty"],c:1},{q:"After Monday?",o:["Tuesday","Sunday","Friday"],c:0},{q:"Sky color?",o:["Green","Blue","Pink"],c:1},{q:"Happy?",o:["Sad","Glad","Angry"],c:0},{q:"I ___ a bike",o:["has","have","am"],c:1},{q:"Book ___ table",o:["on","in","under"],c:0},{q:"Hello?",o:["Tchau","Oi","Obrigado"],c:1},{q:"Dog is...",o:["Object","Fruit","Animal"],c:2},{q:"She ___ pizza",o:["like","likes","liking"],c:1}],
"8": [{q:"Past Do?",o:["Did","Done","Does"],c:0},{q:"Cozinha?",o:["Kitchen","Chicken","Bedroom"],c:0},{q:"I ___ a movie",o:["see","saw","seen"],c:1},{q:"Not color?",o:["White","Water","Purple"],c:1},{q:"They ___ playing",o:["was","were","are"],c:1},{q:"Fast?",o:["Quick","Slow","Strong"],c:1},{q:"Man plural?",o:["Mans","Mens","Men"],c:2},{q:"I have ___ apple",o:["a","an","the"],c:1},{q:"___ you speak?",o:["Does","Do","Are"],c:1},{q:"Past Go?",o:["Gone","Went","Goed"],c:1},{q:"Better?",o:["Gooder","Best","Good"],c:2},{q:"Months in year?",o:["Twelve","Ten","Seven"],c:0},{q:"Butterfly?",o:["Passaro","Borboleta","Aranha"],c:1},{q:"She ___ by bus",o:["go","goes","going"],c:1},{q:"Pen ___ case",o:["inside","on","between"],c:0}],
"9": [{q:"Past Buy?",o:["Bought","Buyed","Boughten"],c:0},{q:"Na verdade?",o:["Actually","Nowadays","Today"],c:0},{q:"I have ___",o:["finish","finishing","finished"],c:2},{q:"Expensive?",o:["Cheap","Poor","Rich"],c:0},{q:"If it rains...",o:["will","would","am"],c:0},{q:"Smartest?",o:["smart","smarter","smartest"],c:2},{q:"Since 2010...",o:["was","were","have been"],c:2},{q:"___ you been?",o:["Have","Do","Did"],c:0},{q:"Cake ___ by me",o:["was made","made","makes"],c:0},{q:"Afraid ___",o:["to","of","with"],c:1},{q:"Push?",o:["Puxe","Empurre","Pare"],c:1},{q:"Interested ___",o:["on","in","at"],c:1},{q:"False friend?",o:["Parents","Car","House"],c:0},{q:"Better than me?",o:["well","better","good"],c:1},{q:"Doesnt ___",o:["likes","like","liking"],c:1}],
"1M":[{q:"If I win...",o:["will","would","shall"],c:0},{q:"Avoid ___",o:["to smoke","smoking","smoke"],c:1},{q:"Hamlet?",o:["Shakespeare","Tolkien","Dante"],c:0},{q:"Pull?",o:["Empurre","Puxe","Pule"],c:1},{q:"Forward ___",o:["to meet","to meeting","meet"],c:1},{q:"Phrasal?",o:["Go up","Run fast","Eat well"],c:0},{q:"Used to ___",o:["play","playing","played"],c:0},{q:"I ___ left",o:["left","have left","had left"],c:2},{q:"Unless you ___",o:["study","dont","studied"],c:0},{q:"Taller?",o:["more tall","taller","tallest"],c:1},{q:"Tired?",o:["tiring","tired","tire"],c:1},{q:"No use ___",o:["to cry","crying","cry"],c:1},{q:"Next week...",o:["will visit","visit","visited"],c:0},{q:"France?",o:["Francer","French","Franch"],c:1},{q:"Happy synonym?",o:["Gloomy","Cheerful","Upset"],c:1}],
"2M":[{q:"He said he ___",o:["is","was","were"],c:1},{q:"I wish I ___",o:["know","knew","known"],c:1},{q:"Written in...",o:["was written","wrote","makes"],c:0},{q:"Prefer tea ___",o:["than","to","over"],c:1},{q:"Hardly ___ I",o:["did","had","was"],c:1},{q:"Unhappy?",o:["unhappy","happy","rich"],c:0},{q:"Despite ___",o:["being","be","to be"],c:0},{q:"Stay home?",o:["stay","to stay","staying"],c:0},{q:"Had better?",o:["would","should","had"],c:2},{q:"None?",o:["None","No","Any"],c:0},{q:"Whose car?",o:["who","whom","whose"],c:2},{q:"Waking up?",o:["wake","waking","woke"],c:1},{q:"Make me ___",o:["clean","to clean","cleaning"],c:0},{q:"Does she?",o:["does","is","do"],c:0},{q:"Ability?",o:["Must","Can","Should"],c:1}],
"3M":[{q:"Had seen?",o:["have","had","was"],c:1},{q:"Stealing?",o:["to steal","stealing","stole"],c:1},{q:"Went home?",o:["go","gone","went"],c:2},{q:"Leave?",o:["leave","leaves","left"],c:0},{q:"Had reached?",o:["had","did","was"],c:0},{q:"Should you?",o:["should","you should","shall"],c:0},{q:"Living?",o:["live","living","lived"],c:1},{q:"Destroyed?",o:["destroying","destroyed","destroy"],c:1},{q:"Would have?",o:["failed","would fail","failed!"],c:2},{q:"More?",o:["more","less","as"],c:0},{q:"Would go?",o:["went","would go","had gone"],c:1},{q:"Than rain?",o:["than","when","then"],c:0},{q:"Didnt tell?",o:["didnt tell","dont","not"],c:0},{q:"To win?",o:["win","to win","winning"],c:1},{q:"Were boss?",o:["is","was","were"],c:2}]
};

// Rotas de Administração
app.get('/api/admin/status', (req, res) => res.json({ r: ranking, l: logs }));
app.post('/api/admin/clear', (req, res) => { 
    ranking = []; 
    logs.push(`[${new Date().toLocaleTimeString()}] ADMIN: Ranking resetado`); 
    res.json({ s: true }); 
});

// Rotas do Jogo
app.get('/api/questions/:g', (req, res) => res.json(db[req.params.g] || []));
app.get('/api/ranking', (req, res) => res.json(ranking));

app.post('/api/submit', (req, res) => {
    const { name, grade, score } = req.body;
    const date = new Date().toLocaleString('pt-BR');
    const entry = { name, grade, score, date };
    
    ranking.push(entry);
    logs.push(`[${new Date().toLocaleTimeString()}] ${name} (${grade}) -> ${score} pts`);
    
    ranking.sort((a, b) => b.score - a.score);
    res.json({ s: true });
});

// Porta dinâmica para o Render ou Local (3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor COC Ativo na porta ${PORT}`));