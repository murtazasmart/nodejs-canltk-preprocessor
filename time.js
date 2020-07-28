// api requst to test speed of prediction to be done
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const axios = require("axios");
const perf = require('execution-time')();

textPredictionsChat22 = [
    "Fuck, for real. after all the talk about this being a separate entity and better bonuses and eveyrything??",
    "you gor FER?",
    "shah congratulations but not worth it now I guess. percentage wise how much bump??",
    "thats true. told you to start looking out",
    "migration is a bit of a long process. start looking in SL",
    "plenty of good offers I see",
    "do do, its good to have. was the bonus good at least?. some 100% bigger pool or something ya??",
    "I dont know what your current one is to comment",
    "15% is like a month and half salary. a lil less",
]

textPredictionsChat42 = [
    "Well I don't know whether to be sad for you that you have to do a subject you don't really want to. Or be happy that we can create chaos in one more class in the last year. 😜😂",
    "What ever works out for you and makes you happy",
    "Hey. U still got your micro n macro papers??",
    "Got a friend who wants em",
    "I don't know. Ill leave when mustafa comes",
    "   ",
    "My point exactly. It takes us 10 min on the bike",
    "Everybody apart from mustafa n myself are there",
    "Stuck doing some work. Told me he'll pick me up by 8.30. Lets see",
    "Great. Now have fun",
    "Well what can I say. I've known mustafa too long to ditch him n take a bus to hsmzas. N also im lazy to do so. 😜",
    "Ah shape. What to do. What's the paper u wanted from aneeta?",
    "Hey. Dibs on your acc papers ah",
    "Ah. Not so sure i want em anymore",
    "👍🏼. Aneeta hasnt done economics of development",
    "Economic geography, geographies of development, development management and population and society. Those are her subjects second year",
    "Haha. Now you have to sort out your f5",
    "Ah that sucks",
    "Monetary seems to carry on from Macro the money part of it. Cf is more about the financial world. I sorta don't agree with tamina in that accounts helps. But if u had done banking it wudve helped. The good thing is no lecturer bias",
    "Ur going to hate him coz its the same lecturer n tute guy",
    "Ya i will. But will leave after he has done ac, mc n abc",
    "What time does mathematical finish. If you don't like it. Don't blame me ah. That's y i said go with a coin toss"
]
textPredictionsChat76 = ["Yeah. Thanx maheshii. :)",
    "Is there any papers called matrix. ?. Like these ones are linear algebra right",
    "I remember sir telling something like thay. I maybe wrong. Was just doubke checking",
    "Cool cool. I must be wronf then. :)",
    "Okayyy.. I messed up like 2 questions.. Cause wasnt sure. Other than it was okay. Total five questions",
    "Haha.. Hopefully 🙈 and im not that smart men..",
    "Haha.. Im not.. You heard what Chaminda Sir said.. He was like I did horrible for the java exam. I might have to repeae",
    "Haha yh true..:p",
    "Sure",
    "Ofcourse.. I will as soon as qe are done with maths.. Ill try to find an answer. :)",
    ". When ur free want some.help. Lets make a list of all the thingsnwe have to remember for the maths test.. For matrices: Properties of determinants 1 to 6 Minor, cofactor, transpose, adjoint, inverse of 2x2, inverse of other matrices  Types of matrices: Square, identity, diagonal, symetric, skew symetric, hermitian, skew hermitian, Upper/ lower triangular, orthogonal  What else?. Determinant of. 2x2 matrix gives area and 3x3 gives volume.",
    "Yh. Anything else",
    "Okay. In vectors: Maginutde of vectors, parallelogram law ie sum of two vectors is given by the diagonal of the parallelogram,  Unit vector is vector divide by unit vector, For (a,b,c) vector space is R3 and components are 3, Vector x vector is scaler, Properties of vectors, Dot product, Dot product 0 means perpendicular  U.u >= 0 and u.u = 0 if and only if u=0 Schawrz and minkowski theory ie |u.v| <= |u|.|v|,|u+v| <= |u|+|v| Distance betweem vectors,  Angle between two vectors is cos x = u.v / |u||v| Projection of u onto v is Proj(u,V) = |u|cos x (unit vecotr of V)",
    "Also finding the tangent thing. Thats confusing. If you can explain with example. Also volume of parallel pipped ie (axb).c = |(axb)||c|cos (phi)",
    "👍🏽. Missing out anything else",
    "👍🏽👍🏽. hi. any progress?",
    "I checked. It stil fails. Why is that. How come it runs in your comouter",
    "So there is something youll have installed which i havent and the server jasnt. Installed globally",
    "Yeah.. Have installed karma globally. ??",
    "Go to local users (username) appdata roaming npm node_modules. Go that path. And send me the full list ur using",
    "Waiting 😂🙈🙈",
    "No prib🙈"]

arrGetReqSVM = []

textPredictionsChat22.forEach((t) => {
    arrGetReqSVM.push(axios.get("http://localhost:5000/predict?chatModel=chat22-model&modelType=svm&chatMessage=" + encodeURI(t)));
});
textPredictionsChat42.forEach((t) => {
    arrGetReqSVM.push(axios.get("http://localhost:5000/predict?chatModel=chat42-model&modelType=svm&chatMessage=" + encodeURI(t)));
});
textPredictionsChat76.forEach((t) => {
    arrGetReqSVM.push(axios.get("http://localhost:5000/predict?chatModel=chat76-model&modelType=svm&chatMessage=" + encodeURI(t)));
});

arrGetReqMLP = []

textPredictionsChat22.forEach((t) => {
    arrGetReqMLP.push(axios.get("http://localhost:5000/predict?chatModel=chat22-model&modelType=mlp&chatMessage=" + encodeURI(t)));
});
textPredictionsChat42.forEach((t) => {
    arrGetReqMLP.push(axios.get("http://localhost:5000/predict?chatModel=chat42-model&modelType=mlp&chatMessage=" + encodeURI(t)));
});
textPredictionsChat76.forEach((t) => {
    arrGetReqMLP.push(axios.get("http://localhost:5000/predict?chatModel=chat76-model&modelType=mlp&chatMessage=" + encodeURI(t)));
});

arrGetReqEnsemble = []

textPredictionsChat22.forEach((t) => {
    arrGetReqEnsemble.push(axios.get("http://localhost:5000/predict?chatModel=chat22-model&modelType=ensemble&chatMessage=" + encodeURI(t)));
});
textPredictionsChat42.forEach((t) => {
    arrGetReqEnsemble.push(axios.get("http://localhost:5000/predict?chatModel=chat42-model&modelType=ensemble&chatMessage=" + encodeURI(t)));
});
textPredictionsChat76.forEach((t) => {
    arrGetReqEnsemble.push(axios.get("http://localhost:5000/predict?chatModel=chat76-model&modelType=ensemble&chatMessage=" + encodeURI(t)));
});


perf.start("svmTime");
axios.all(arrGetReqSVM).then(axios.spread(function (acct, perms) {
    svmTime = perf.stop("svmTime");
    console.log("svmTime is " + svmTime.time);
    perf.start("mlpTime");
    axios.all(arrGetReqMLP).then(axios.spread(function (acct, perms) {
        mlpTime = perf.stop("mlpTime");
        console.log("svmTime is " + mlpTime.time);
        perf.start("ensembleTime");
        axios.all(arrGetReqEnsemble).then(axios.spread(function (acct, perms) {
            ensembleTime = perf.stop("ensembleTime");
            console.log("svmTime is " + ensembleTime.time);
        })).catch((err) => {
            console.log(err);
        });;
    })).catch((err) => {
        console.log(err);
    });;
})).catch((err) => {
    console.log(err);
});

  // const csvWriter = createCsvWriter({
  //     path: './svm.csv',
  //     header: [
  //         { id: 'svmTime', title: 'SVMTime' },
  //         { id: 'mlpTime', title: 'MLPTime' },
  //         { id: 'ensembleTime', title: 'EnsembleTime' },
  //     ]
  // });

// const records = [
//     { name: 'Bob', lang: 'French, English' },
// ];

// csvWriter.writeRecords(records)       // returns a promise
//     .then(() => {
//         console.log('...Done');
//     });