const express = require('express')
const app = express()
const f = require("./index.js")
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const perf = require('execution-time')();
const fs = require('fs');

// f.run_formatter_byte_stream()

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/preprocess', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000)

app.post('/preprocess', async (req, res) => {
    try {
        if(!req.files) {
            return res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let chat
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            if (req.body.rawFolderName, req.files.chat, req.body.chatModelNo, req.body.firstName, req.body.secondName, req.body.firstNameSearchString, req.body.secondNameSearchString) {
                chat = req.files.chat;
                const rawFolderName = req.body.rawFolderName;
                const rawFileName = chat.name;
                const chatModelNo = Number(req.body.chatModelNo);
                const firstName = req.body.firstName;
                const secondName = req.body.secondName;
                const firstNameSearchString = req.body.firstNameSearchString;
                const secondNameSearchString = req.body.secondNameSearchString;

                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                chat.mv('D:/MSc/Chat Parser Script/chat-data/raw/' + rawFolderName + '/' + chat.name, (err) => {

                    perf.start("timeFirstModel");
                    // t.substring(t.indexOf(":") + 2, t.indexOf("ms"))
                    f.run_formatter_byte_stream("D:/MSc/Chat Parser Script/chat-data/processed-chat/chat" + chatModelNo + "-" + firstName + "-" + secondName, rawFolderName, rawFileName, firstNameSearchString, secondNameSearchString).then((saved1)=> {
                        timeResultsFirstModel = perf.stop("timeFirstModel");
                        perf.start("timeSecondModel");
                        f.run_formatter_byte_stream("D:/MSc/Chat Parser Script/chat-data/processed-chat/chat" + (chatModelNo + 1) + "-" + secondName + "-" + firstName, rawFolderName, rawFileName, secondNameSearchString, firstNameSearchString).then((saved2) => {
                            timeResultsSecondModel = perf.stop("timeSecondModel");
                            fs.writeFile("D:/MSc/Chat Parser Script/chat-data/timings/chat" + chatModelNo + "preprocessing-time.txt",
                            "timeFirstModel=" + timeResultsFirstModel.time + "\n" + "timeSecondModel=" + timeResultsSecondModel.time, (err) => {
                                console.log(err);
                            });
                            return res.status(200).json({"Ok": "GOOD"})
                        }).catch((err) => {
                            console.log(err);
                        });
                    }).catch((err) => {
                        console.log(err);
                    });
                });
                //send response
                // res.redirect("http://localhost:5000/feature-extraction?buildModel=true&firstModel=chat" + chatModelNo + "-" + firstName + "-" + secondName + "&secondModel=" + "chat" + (chatModelNo + 1) + "-" + secondName + "-" + firstName);
            } else {
                return res.status(400).json({ "err": "Missing parameters"});
            }
            // res.send({
            //     status: true,
            //     message: 'File is uploaded',
            //     data: {
            //         name: chat.name,
            //     }
            // });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});