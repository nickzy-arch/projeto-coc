const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

let ranking = [];
let bannedUsers = [];
let logs = [`[SISTEMA] Iniciado em ${new Date().toLocaleString()}`];

const bancoQuestoes = {
    "7": [
    { q: "Past of 'Go'?", a: "Went", o: ["Goes", "Went", "Gone", "Going"] },
    { q: "Opposite of 'Big'?", a: "Small", o: ["Large", "Small", "Tall", "Long"] },
    { q: "Traduzir: 'Book'", a: "Livro", o: ["Caneta", "Livro", "Mesa", "Cadeira"] },
    { q: "I ___ a student.", a: "am", o: ["is", "are", "am", "be"] },
    { q: "She ___ pizza.", a: "likes", o: ["like", "likes", "liking", "liked"] },
    { q: "Color of the sky?", a: "Blue", o: ["Red", "Green", "Blue", "Yellow"] },
    { q: "Plural of 'Child'?", a: "Children", o: ["Childs", "Childrens", "Children", "Childes"] },
    { q: "Negative of 'I can'?", a: "I can't", o: ["I no can", "I not can", "I can't", "I don't can"] },
    { q: "Day after Monday?", a: "Tuesday", o: ["Wednesday", "Tuesday", "Thursday", "Friday"] },
    { q: "10 + 5 is...", a: "Fifteen", o: ["Ten", "Twelve", "Fifteen", "Fifty"] },
    { q: "I have two ___ (olhos).", a: "eyes", o: ["ears", "eyes", "hands", "legs"] },
    { q: "___ you speak English?", a: "Do", o: ["Does", "Do", "Are", "Is"] },
    { q: "Opposite of 'Hot'?", a: "Cold", o: ["Warm", "Cold", "Dry", "Wet"] },
    { q: "Where is the book? It's ___ the table.", a: "on", o: ["in", "on", "at", "under"] },
    { q: "Past of 'Buy'?", a: "Bought", o: ["Buyed", "Bought", "Brought", "Bins"] },
    { q: "Plural of 'Dog'?", a: "Dogs", o: ["Doges", "Dogs", "Dog", "Dogss"] },
    { q: "Opposite of 'Happy'?", a: "Sad", o: ["Sad", "Angry", "Hungry", "Fast"] },
    { q: "Translate: 'Apple'", a: "Maçã", o: ["Banana", "Maçã", "Laranja", "Uva"] },
    { q: "He ___ my friend.", a: "is", o: ["am", "is", "are", "be"] },
    { q: "They ___ students.", a: "are", o: ["is", "am", "are", "be"] },
    { q: "Opposite of 'Fast'?", a: "Slow", o: ["Slow", "Quick", "Speed", "Run"] },
    { q: "Translate: 'House'", a: "Casa", o: ["Carro", "Casa", "Rua", "Prédio"] },
    { q: "I ___ soccer.", a: "play", o: ["plays", "play", "playing", "played"] },
    { q: "She ___ happy.", a: "is", o: ["am", "is", "are", "be"] },
    { q: "Color of grass?", a: "Green", o: ["Blue", "Red", "Green", "Black"] },
    { q: "Plural of 'Car'?", a: "Cars", o: ["Car", "Cars", "Cares", "Carss"] },
    { q: "Opposite of 'Old'?", a: "New", o: ["New", "Old", "Ancient", "Past"] },
    { q: "Translate: 'Water'", a: "Água", o: ["Fogo", "Terra", "Água", "Ar"] },
    { q: "We ___ friends.", a: "are", o: ["is", "am", "are", "be"] },
    { q: "Birds can ___", a: "fly", o: ["run", "swim", "fly", "walk"] }
],
    ],
    "8": [
        { q: "Comparative of 'Tall'?", a: "Taller", o: ["Taller", "More tall", "Tallest", "Taller than"] },
        { q: "Superlative of 'Good'?", a: "The best", o: ["The better", "The best", "The goodest", "The most good"] },
        { q: "He ___ TV every day.", a: "watches", o: ["watch", "watches", "watching", "watched"] },
        { q: "Past of 'Write'?", a: "Wrote", o: ["Writed", "Written", "Wrote", "Writing"] },
        { q: "Meaning of 'Actually'?", a: "Na verdade", o: ["Atualmente", "Agora", "Na verdade", "Sempre"] },
        { q: "___ you ever been to NYC?", a: "Have", o: ["Has", "Have", "Did", "Do"] },
        { q: "I'm interested ___ music.", a: "in", o: ["at", "on", "in", "for"] },
        { q: "Opposite of 'Cheap'?", a: "Expensive", o: ["Easy", "Cheap", "Expensive", "Fast"] },
        { q: "If it rains, I ___ stay home.", a: "will", o: ["would", "will", "did", "am"] },
        { q: "A person who cooks is a...", a: "Chef", o: ["Cooker", "Chef", "Doctor", "Teacher"] },
        { q: "They ___ playing soccer now.", a: "are", o: ["is", "am", "are", "be"] },
        { q: "___ is your name?", a: "What", o: ["Who", "What", "Where", "When"] },
        { q: "I ___ to the gym yesterday.", a: "went", o: ["go", "goes", "went", "gone"] },
        { q: "Past of 'Sleep'?", a: "Slept", o: ["Sleeped", "Slept", "Slepen", "Slopes"] },
        { q: "Meaning of 'Parents'?", a: "Pais", o: ["Parentes", "Pais", "Avós", "Primos"] },
        { q: "Opposite of 'Happy'?", a: "Sad", o: ["Happy", "Sad", "Angry", "Fast"] },
        { q: "Plural of 'Man'?", a: "Men", o: ["Mans", "Mens", "Men", "Manes"] },
        { q: "She ___ to school every day.", a: "goes", o: ["go", "goes", "going", "went"] },
        { q: "Past of 'Eat'?", a: "Ate", o: ["Eated", "Ate", "Eaten", "Eating"] },
        { q: "Meaning of 'Fast'?", a: "Rápido", o: ["Devagar", "Rápido", "Alto", "Baixo"] },
        { q: "___ she your friend?", a: "Is", o: ["Are", "Is", "Do", "Does"] },
        { q: "I have ___ apple.", a: "an", o: ["a", "an", "the", "some"] },
        { q: "Opposite of 'Early'?", a: "Late", o: ["Soon", "Late", "Fast", "Now"] },
        { q: "They ___ soccer yesterday.", a: "played", o: ["play", "plays", "played", "playing"] },
        { q: "Meaning of 'Teacher'?", a: "Professor", o: ["Aluno", "Professor", "Diretor", "Amigo"] },
        { q: "We ___ watching TV.", a: "are", o: ["is", "are", "am", "be"] },
        { q: "___ you like pizza?", a: "Do", o: ["Does", "Do", "Are", "Is"] },
        { q: "Past of 'Run'?", a: "Ran", o: ["Runned", "Ran", "Run", "Running"] },
        { q: "Meaning of 'Car'?", a: "Carro", o: ["Casa", "Carro", "Rua", "Cidade"] },
        { q: "Opposite of 'Old'?", a: "Young", o: ["Old", "Young", "Big", "New"] }

    ],
    "9": [
        { q: "Present Perfect: I ___ that movie.", a: "have seen", o: ["saw", "have seen", "seen", "has seen"] },
        { q: "Meaning of 'Anyway'?", a: "De qualquer forma", o: ["Caminho", "Sempre", "De qualquer forma", "Nunca"] },
        { q: "Passive: 'She eats cake' ->", a: "Cake is eaten", o: ["Cake is eat", "Cake is eaten", "Cake was eat", "Cake eats"] },
        { q: "If I ___ you, I'd go.", a: "were", o: ["am", "was", "were", "be"] },
        { q: "Relative pronoun for people:", a: "Who", o: ["Which", "Who", "Where", "Whose"] },
        { q: "Opposite of 'Borrow'?", a: "Lend", o: ["Give", "Lend", "Take", "Keep"] },
        { q: "She is afraid ___ spiders.", a: "of", o: ["with", "by", "of", "from"] },
        { q: "I ___ my homework yet.", a: "haven't finished", o: ["didn't finish", "haven't finished", "not finish", "don't finish"] },
        { q: "Meaning of 'Notice'?", a: "Perceber", o: ["Notícia", "Anotar", "Perceber", "Avisar"] },
        { q: "The man ___ car was stolen.", a: "whose", o: ["who", "which", "whose", "that"] },
        { q: "I look forward to ___ you.", a: "meeting", o: ["meet", "meets", "meeting", "met"] },
        { q: "Past of 'Drink'?", a: "Drank", o: ["Drunk", "Drank", "Drinked", "Drinks"] },
        { q: "___ did you arrive?", a: "When", o: ["What", "When", "Who", "Which"] },
        { q: "It's ___ umbrella.", a: "an", o: ["a", "an", "the", "some"] },
        { q: "Meaning of 'Library'?", a: "Biblioteca", o: ["Livraria", "Biblioteca", "Escola", "Loja"] },
        { q: "Past Perfect: I ___ finished.", a: "had", o: ["have", "had", "has", "was"] },
        { q: "Meaning of 'Although'?", a: "Embora", o: ["Porque", "Embora", "Mas", "Então"] },
        { q: "Passive: 'They clean the room'", a: "The room is cleaned", o: ["Room cleaned", "The room is cleaned", "The room cleaned", "Clean room"] },
        { q: "If she ___, she would pass.", a: "studied", o: ["study", "studied", "studies", "studying"] },
        { q: "Opposite of 'Win'?", a: "Lose", o: ["Win", "Lose", "Draw", "Play"] },
        { q: "She is good ___ math.", a: "at", o: ["in", "on", "at", "for"] },
        { q: "Meaning of 'Improve'?", a: "Melhorar", o: ["Piorar", "Melhorar", "Parar", "Continuar"] },
        { q: "I have ___ this before.", a: "seen", o: ["see", "saw", "seen", "seeing"] },
        { q: "Relative pronoun for things:", a: "Which", o: ["Who", "Which", "Where", "Whose"] },
        { q: "Past of 'Take'?", a: "Took", o: ["Taken", "Took", "Take", "Taking"] },
        { q: "Meaning of 'Job'?", a: "Trabalho", o: ["Casa", "Trabalho", "Rua", "Tempo"] },
        { q: "___ did you go?", a: "Where", o: ["What", "Where", "When", "Why"] },
        { q: "She ___ already left.", a: "has", o: ["have", "has", "had", "is"] },
        { q: "Opposite of 'Start'?", a: "Finish", o: ["Start", "Finish", "Open", "Run"] },
        { q: "Meaning of 'Strong'?", a: "Forte", o: ["Fraco", "Forte", "Grande", "Pequeno"] }

    ],
    "1M": [
        { q: "Second Conditional: If I won, I ___ buy a car.", a: "would", o: ["will", "would", "shall", "can"] },
        { q: "Modal for permission:", a: "May", o: ["Must", "Should", "May", "Will"] },
        { q: "Sinônimo de 'Huge'?", a: "Enormous", o: ["Small", "Tiny", "Enormous", "Fast"] },
        { q: "He is used to ___ early.", a: "waking up", o: ["wake up", "waking up", "woke up", "wakes up"] },
        { q: "Passive: 'They stole my bag'", a: "My bag was stolen", o: ["My bag is stolen", "My bag was stolen", "Bag stolen", "They stolen"] },
        { q: "Tag Question: 'You are ok, ___?'", a: "aren't you", o: ["don't you", "aren't you", "are you", "isn't it"] },
        { q: "Unless means...", a: "A menos que", o: ["A menos que", "Se", "Por causa de", "Embora"] },
        { q: "I enjoy ___ movies.", a: "watching", o: ["to watch", "watch", "watching", "watched"] },
        { q: "Past of 'Teach'?", a: "Taught", o: ["Teached", "Taught", "Thought", "Taughted"] },
        { q: "Meaning of 'Push'?", a: "Empurrar", o: ["Puxar", "Empurrar", "Parar", "Correr"] },
        { q: "The book ___ I read was good.", a: "that", o: ["who", "that", "whose", "whom"] },
        { q: "I have ___ friends.", a: "a few", o: ["a little", "a few", "much", "any"] },
        { q: "He is ___ than me.", a: "smarter", o: ["smart", "smarter", "smartest", "more smart"] },
        { q: "Wait ___ me.", a: "for", o: ["to", "for", "with", "at"] },
        { q: "Meaning of 'Mayor'?", a: "Prefeito", o: ["Maior", "Prefeito", "Melhor", "Juiz"] },
        { q: "First Conditional: If it rains, I ___ stay.", a: "will", o: ["would", "will", "can", "did"] },
        { q: "Meaning of 'However'?", a: "No entanto", o: ["Então", "No entanto", "Sempre", "Nunca"] },
        { q: "He ___ working now.", a: "is", o: ["are", "is", "was", "be"] },
        { q: "Past of 'Drive'?", a: "Drove", o: ["Drived", "Drove", "Driven", "Driving"] },
        { q: "Opposite of 'Easy'?", a: "Hard", o: ["Easy", "Hard", "Soft", "Light"] },
        { q: "Meaning of 'Travel'?", a: "Viajar", o: ["Comer", "Viajar", "Estudar", "Dormir"] },
        { q: "She ___ a letter yesterday.", a: "wrote", o: ["write", "writes", "wrote", "writing"] },
        { q: "___ you help me?", a: "Can", o: ["Can", "Must", "May", "Should"] },
        { q: "Meaning of 'Money'?", a: "Dinheiro", o: ["Tempo", "Dinheiro", "Casa", "Rua"] },
        { q: "Past of 'See'?", a: "Saw", o: ["Seen", "Saw", "See", "Seeing"] },
        { q: "Opposite of 'Open'?", a: "Close", o: ["Open", "Close", "Start", "End"] },
        { q: "I ___ never been there.", a: "have", o: ["has", "have", "had", "am"] },
        { q: "Meaning of 'Food'?", a: "Comida", o: ["Bebida", "Comida", "Mesa", "Prato"] },
        { q: "She is ___ than me.", a: "taller", o: ["tall", "taller", "tallest", "more tall"] },
        { q: "Past of 'Speak'?", a: "Spoke", o: ["Spoke", "Speak", "Spoken", "Speaking"] }

        
    ],
    "2M": [
        { q: "Third Conditional: If I ___ studied...", a: "had", o: ["have", "had", "would", "am"] },
        { q: "Reported: 'I am tired' -> He said...", a: "he was tired", o: ["he is tired", "he was tired", "he be tired", "he am tired"] },
        { q: "Passive: 'Someone has found it'", a: "It has been found", o: ["It was found", "It has been found", "It is found", "It found"] },
        { q: "Meaning of 'Despite'?", a: "Apesar de", o: ["Desde", "Apesar de", "Depois", "Durante"] },
        { q: "I wish I ___ a pilot.", a: "were", o: ["am", "was", "were", "be"] },
        { q: "By the time he arrived, I ___.", a: "had left", o: ["left", "have left", "had left", "was leaving"] },
        { q: "Meaning of 'Advice'?", a: "Conselho", o: ["Aviso", "Conselho", "Ajuda", "Revisão"] },
        { q: "Which is a Phrasal Verb?", a: "Give up", o: ["Go", "Give up", "Eat", "Study"] },
        { q: "Modal for obligation:", a: "Must", o: ["Could", "Must", "Might", "May"] },
        { q: "The car was ___ expensive.", a: "too", o: ["too", "enough", "very much", "so as"] },
        { q: "Meaning of 'Comprehensive'?", a: "Abrangente", o: ["Compreensivo", "Abrangente", "Curto", "Rápido"] },
        { q: "Hardly ever means...", a: "Quase nunca", o: ["Sempre", "Quase nunca", "Frequentemente", "Às vezes"] },
        { q: "He succeeded ___ passing.", a: "in", o: ["on", "at", "in", "to"] },
        { q: "___ the weather was bad, we went.", a: "Although", o: ["Because", "Although", "But", "So"] },
        { q: "Sinônimo de 'Wealthy'?", a: "Rich", o: ["Poor", "Rich", "Sick", "Healthy"] },
        { q: "Meaning of 'Therefore'?", a: "Portanto", o: ["Mas", "Portanto", "Embora", "Depois"] },
        { q: "He ___ been working.", a: "has", o: ["have", "has", "had", "is"] },
        { q: "Opposite of 'Increase'?", a: "Decrease", o: ["Increase", "Decrease", "Grow", "Rise"] },
        { q: "Past of 'Choose'?", a: "Chose", o: ["Choose", "Chosen", "Chose", "Choosing"] },
        { q: "Meaning of 'Skill'?", a: "Habilidade", o: ["Erro", "Habilidade", "Tempo", "Lugar"] },
        { q: "She ___ finished yet.", a: "hasn't", o: ["hasn't", "haven't", "didn't", "don't"] },
        { q: "Modal for possibility:", a: "Might", o: ["Must", "Might", "Will", "Can"] },
        { q: "Meaning of 'Effort'?", a: "Esforço", o: ["Erro", "Esforço", "Tempo", "Caminho"] },
        { q: "Opposite of 'Accept'?", a: "Refuse", o: ["Accept", "Refuse", "Take", "Give"] },
        { q: "Past of 'Begin'?", a: "Began", o: ["Begun", "Begin", "Began", "Beginning"] },
        { q: "Meaning of 'Goal'?", a: "Objetivo", o: ["Erro", "Objetivo", "Lugar", "Tempo"] },
        { q: "She ___ working here.", a: "is", o: ["are", "is", "was", "be"] },
        { q: "Opposite of 'Success'?", a: "Failure", o: ["Success", "Failure", "Win", "Gain"] },
        { q: "Meaning of 'Knowledge'?", a: "Conhecimento", o: ["Tempo", "Conhecimento", "Erro", "Casa"] },
        { q: "Past of 'Break'?", a: "Broke", o: ["Broken", "Break", "Broke", "Breaking"] }
 
    ],
    "3M": [
        { q: "Inversion: Never ___ I seen...", a: "have", o: ["I have", "have", "had", "did"] },
        { q: "Meaning of 'Strive'?", a: "Esforçar-se", o: ["Parar", "Esforçar-se", "Gritar", "Correr"] },
        { q: "Sinônimo de 'Albeit'?", a: "Although", o: ["Also", "Although", "Always", "Anyway"] },
        { q: "He denied ___ the car.", a: "stealing", o: ["to steal", "steal", "stealing", "stolen"] },
        { q: "Idiom: 'To pull someone's leg'?", a: "Zombar", o: ["Puxar a perna", "Zombar", "Ajudar", "Correr"] },
        { q: "Passive: 'They will fix it'", a: "It will be fixed", o: ["It will fix", "It will be fixed", "It is fixed", "Fixed it"] },
        { q: "Meaning of 'Hazard'?", a: "Risco", o: ["Sorte", "Risco", "Lugar", "Caminho"] },
        { q: "If only I ___ her name.", a: "knew", o: ["know", "knew", "known", "knowing"] },
        { q: "Sinônimo de 'Tough'?", a: "Difficult", o: ["Easy", "Soft", "Difficult", "Thin"] },
        { q: "I'd rather you ___ here.", a: "stayed", o: ["stay", "stayed", "staying", "stays"] },
        { q: "Meaning of 'Hectic'?", a: "Agitado", o: ["Lento", "Agitado", "Triste", "Frio"] },
        { q: "Hardly ___ I started when it rained.", a: "had", o: ["have", "had", "did", "was"] },
        { q: "Sinônimo de 'Thorough'?", a: "Detailed", o: ["Fast", "Detailed", "Simple", "Small"] },
        { q: "Meaning of 'Wander'?", a: "Vagar", o: ["Perguntar", "Vagar", "Querer", "Esperar"] },
        { q: "The movie was ___ boring.", a: "utterly", o: ["utterly", "enough", "too much", "so as"] },
        { q: "Meaning of 'Outcome'?", a: "Resultado", o: ["Processo", "Resultado", "Erro", "Tempo"] },
        { q: "Opposite of 'Expand'?", a: "Reduce", o: ["Expand", "Reduce", "Grow", "Increase"] },
        { q: "He ___ already finished.", a: "has", o: ["have", "has", "had", "is"] },
        { q: "Past of 'Rise'?", a: "Rose", o: ["Risen", "Rose", "Rise", "Rising"] },
        { q: "Meaning of 'Achieve'?", a: "Alcançar", o: ["Perder", "Alcançar", "Parar", "Desistir"] },
        { q: "Opposite of 'Complex'?", a: "Simple", o: ["Complex", "Simple", "Hard", "Heavy"] },
        { q: "She ___ been studying.", a: "has", o: ["have", "has", "had", "is"] },
        { q: "Meaning of 'Challenge'?", a: "Desafio", o: ["Erro", "Desafio", "Tempo", "Lugar"] },
        { q: "Past of 'Grow'?", a: "Grew", o: ["Grown", "Grow", "Grew", "Growing"] },
        { q: "Opposite of 'Gain'?", a: "Lose", o: ["Gain", "Lose", "Win", "Earn"] },
        { q: "Meaning of 'Environment'?", a: "Ambiente", o: ["Tempo", "Ambiente", "Erro", "Casa"] },
        { q: "He ___ working hard.", a: "is", o: ["are", "is", "was", "be"] },
        { q: "Past of 'Know'?", a: "Knew", o: ["Known", "Know", "Knew", "Knowing"] },
        { q: "Opposite of 'Advance'?", a: "Retreat", o: ["Advance", "Retreat", "Move", "Go"] },
        { q: "Meaning of 'Research'?", a: "Pesquisa", o: ["Erro", "Pesquisa", "Tempo", "Lugar"] }

    ]
};

app.post('/api/check-auth', (req, res) => {
    const { name, token } = req.body;
    if (bannedUsers.includes(name)) return res.json({ status: 'banned' });
    const existingUser = ranking.find(u => u.name === name);
    if (existingUser && existingUser.token !== token) return res.json({ status: 'taken' });
    res.json({ status: 'ok' });
});

app.post('/api/submit', (req, res) => {
    const { name, grade, score, token } = req.body;
    if (bannedUsers.includes(name)) return res.status(403).send();
    const index = ranking.findIndex(u => u.name === name);
    if (index !== -1) {
        if (ranking[index].token === token) ranking[index].score = score;
    } else {
        ranking.push({ name, grade, score, token, date: new Date().toLocaleTimeString() });
    }
    ranking.sort((a, b) => b.score - a.score);
    logs.push(`[SISTEMA] ${name} atualizou pontos: ${score}`);
    res.json({ s: true });
});

app.get('/api/admin/data', (req, res) => res.json({ ranking, logs, bannedUsers }));
app.post('/api/admin/ban', (req, res) => {
    const { name } = req.body;
    if (!bannedUsers.includes(name)) bannedUsers.push(name);
    ranking = ranking.filter(u => u.name !== name);
    res.json({ s: true });
});
app.get('/api/questions/:grade', (req, res) => res.json(bancoQuestoes[req.params.grade] || []));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor ativo"));
