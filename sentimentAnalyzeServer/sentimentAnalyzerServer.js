const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = new express();

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key,
        }),
        serviceUrl: api_url,
    });
    return naturalLanguageUnderstanding;
}

function getTextEmotion (texte, dtyp,res) {
    naturalLanguageUnderstanding = new getNLUInstance();
    let analyzeParams = {
            'html': '<html><head><title>Fruits</title></head><body><h1>Apples and Oranges</h1><p>I love apples! I don\'t like oranges.</p></body></html>',
            'features': {
                'emotion': {
                'targets': [
                    'apples',
                    'oranges'
                ]
                }
            }
            };
    if(dtyp=='text') {
        analyzeParams = {
            'features': {
            'emotion': {}
            },
        'text': texte
        }
    }
    console.log(analyzeParams);
    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            res.send(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });
};
//getTextEmotion('i am glad to talk to you today', 'text');


app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    return res.send(req);
    //return res.send({"happy":"90x","sad":"10"});
});

app.get("/url/sentiment", (req,res) => {
    return res.send("url sentiment for "+req.query.url);
});

app.get("/text/emotion", (req,res) => {
    getTextEmotion(req.query.text, 'text',res);
    //return res.send(getTextEmotion(req.query.text, 'text',res));
    //return res.send({"happy":"10x","sad":"90"});
});

app.get("/text/sentiment", (req,res) => {
    return res.send("text sentiment for "+req.query.text);
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

