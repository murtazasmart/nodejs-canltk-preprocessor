const readline = require('readline');
const fs = require('fs');

function run_formatter_byte_stream(fileName, rawFolderName, rawFileName, firstNameSearchString, secondNameSearchString) {
    return new Promise((resolve, reject) => {
        const name1 = firstNameSearchString;
        const name2 = secondNameSearchString;
        let textCSV = "";
        let continuedChat = false;
        let chatSwitch = false;
        let previousLine = "";
        let multiSentenceChat = false;
        let multiSentenceFirstLine = "";
        let chatName = name1;
        const readInterface = readline.createInterface({
            input: fs.createReadStream('D:/MSc/Chat Parser Script/chat-data/raw/' + rawFolderName + '/' + rawFileName),
            // input: fs.createReadStream('./chat.txt'),
            console: false
        });
        
        readInterface.on('line', (line) => {
            if (line.indexOf(name1) !== -1) {
                if (previousLine.indexOf(name1) !== -1 && previousLine !== "") {
                    continuedChat = true;
                } else {
                    continuedChat = false;
                }
                previousLine = line;
                // textCSV += formatText(line) + " $break$ ";
                // since we are adding fullstops can skew data
                if (continuedChat) {
                    t = formatText(line, name1, name2);
                    if (t == "") {
                        //
                    } else {
                        textCSV += ". " + formatText(line, name1, name2);
                    }
                } else {
                    textCSV += formatText(line, name1, name2);
                }
                chatSwitch = true;
            } else if (previousLine.indexOf(name1) !== -1 && line.indexOf(name2) == -1) {
                multiSentenceChat = true;
                multiSentenceFirstLine = previousLine;
                continuedChat = true;
                textCSV += " " + formatText(line, name1, name2);
            } else if (multiSentenceChat && multiSentenceFirstLine.indexOf(name2) !== -1) {
                textCSV += " " + formatText(line, name1, name2);
            } else {
                multiSentenceChat = false;
                multiSentenceFirstLine = "";
                previousLine = line;
                if (chatSwitch) {
                    textCSV += "\n";
                    chatSwitch = false;
                }
            }
        });
        
        readInterface.on('close', (line) => {
            console.log("done");
            textCSV = textCSV.replace(/^\s*\n/gm, "")
            fs.writeFile(fileName + ".txt", textCSV, (err) => {
                console.log(err);
                resolve(true);
            })
        });
    });
}

function run_formatter_file() {
    let name2 = " - Murtaza Abbas: ";
    let name1 = " - Hatim: ";
    let textCSV = "";
    let continuedChat = false;
    let chatSwitch = false;
    let previousLine = "";
    let multiSentenceChat = false;
    let multiSentenceFirstLine = "";
    let chatName = name1;
    const readInterface = readline.createInterface({
        input: fs.createReadStream('./chat-data/raw/kusi/WhatsApp Chat with Hatim.txt'),
        // input: fs.createReadStream('./chat.txt'),
        console: false
    });
    
    readInterface.on('line', (line) => {
        if (line.indexOf(name1) !== -1) {
            if (previousLine.indexOf(name1) !== -1 && previousLine !== "") {
                continuedChat = true;
            } else {
                continuedChat = false;
            }
            previousLine = line;
            // textCSV += formatText(line) + " $break$ ";
            // since we are adding fullstops can skew data
            if (continuedChat) {
                textCSV += ". " + formatText(line, name1, name2);
            } else {
                textCSV += formatText(line, name1, name2);
            }
            chatSwitch = true;
        } else if (previousLine.indexOf(name1) !== -1 && line.indexOf(name2) == -1) {
            multiSentenceChat = true;
            multiSentenceFirstLine = previousLine;
            continuedChat = true;
            textCSV += " " + formatText(line, name1, name2);
        } else if (multiSentenceChat && multiSentenceFirstLine.indexOf(name2) !== -1) {
            textCSV += " " + formatText(line, name1, name2);
        } else {
            multiSentenceChat = false;
            multiSentenceFirstLine = "";
            previousLine = line;
            if (chatSwitch) {
                textCSV += "\n";
                chatSwitch = false;
            }
        }
    });
    
    readInterface.on('close', (line) => {
        console.log("done");
        fs.writeFile(fileName + ".txt", textCSV, (err) => {
            console.log(err);
        })
    });
}

function formatText(text, name1, name2) {
    if (text.indexOf(name1) !== -1) {
        cleansedText = text.substring(text.indexOf(name1) + name1.length);
    } else {
        cleansedText = text;
    }
    cleansedText = encodeMissedVoiceCalls(cleansedText);
    cleansedText = encodeVCF(cleansedText);
    cleansedText = encodeURLs(cleansedText);
    cleansedText = deleteImageOmittedMessage(cleansedText);
    cleansedText = deleteMedia(cleansedText);
    cleansedText = deleteMessageDocuments(cleansedText);
    cleansedText = deleteMessageEncryptedNote(cleansedText);
    cleansedText = deleteMessageDeletedNote(cleansedText);
    return cleansedText;
}

function encodeMissedVoiceCalls(text) {
    if (text.indexOf("Missed voice call") !== -1) {
        return "MissedVoiceCall";
    } else {
        return text;
    }
}

function encodeVCF(text) {
    if (text.indexOf(".vcf") !== -1) {
        return "VCF";
    } else {
        return text;
    }
}

function deleteMessageDeletedNote(text) {
    if (text.indexOf("This message was deleted") !== -1) {
        return "";
    } else {
        return text;
    }
}

function deleteMessageEncryptedNote(text) {
    if (text.indexOf("Messages to this chat and calls are now secured with") !== -1) {
        return "";
    } else {
        return text;
    }
}

function encodeURLs(text) {
    // typos like okay.right will be flagged as URLS
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'); // OR ip (v4) address
    //   '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    //   '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    //   '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    if (!!pattern.test(text)) {
        return "URL";
    } else {
        return text;
    }
    // not needed
}

function compactText() {
    // not needed yet
}

function deleteMedia(text) {
    if (text.indexOf("<Media omitted>") !== -1) {
        return "";
    } else {
        return text;
    }
}

function deleteImageOmittedMessage(text) {
    if (text.indexOf("‎image omitted") !== -1) {
        return "";
    } else {
        return text;
    }
}

function encodeGIFs() {

}

function deleteMessageDocuments(text) {
    if (text.indexOf("‎document omitted") !== -1) {
        return "DOCUMENT";
    } else {
        return text;
    }
}

// run_formatter_byte_stream("D:/MSc/Chat Parser Script/chat-data/processed-chat/chat3-AbbasJafferjee-HamzaNajmudeen","hamza","Abbas Jafferjee.txt", " Abbas Jafferjee: ", " Hamza Najmudeen: ")
// fs.readdir("D:/MSc/Chat Parser Script/chat-data/processed-chat/", (err, files) => {
//     files.forEach((file) => {
//         if(true) {
//             fs.readFile('D:/MSc/Chat Parser Script/chat-data/processed-chat/' + file, 'utf8', function(err, data) {
//                 if (err) throw err;
//                 console.log(data);
//                 let textCSV = data;
//                 textCSV = deleteMessageDeletedNote(textCSV);
//                 textCSV = deleteMessageEncryptedNote(textCSV);
//                 textCSV = deleteMedia(textCSV);
//                 textCSV = deleteImageOmittedMessage(textCSV);
//                 textCSV = deleteMessageDocuments(textCSV);
//                 textCSV = textCSV.replace(/^\s*\n/gm, "");
//                 fs.writeFile('D:/MSc/Chat Parser Script/chat-data/processed-chat/' + file, textCSV, (err) => {
//                     console.log(err);
//                 })
//             });
//             // const readInterface = readline.createInterface({
//             //     input: fs.createReadStream(),
//             //     // input: fs.createReadStream('./chat.txt'),
//             //     console: false
//             // });
            
//             // readInterface.on('close', (line) => {
//             //     console.log("done");
//             //     textCSV = deleteMessageDeletedNote(textCSV);
//             //     textCSV = deleteMessageEncryptedNote(textCSV);
//             //     textCSV = deleteMedia(textCSV);
//             //     textCSV = deleteImageOmittedMessage(textCSV);
//             //     textCSV = deleteMessageDocuments(textCSV);
//             //     textCSV = textCSV.replace(/^\s*\n/gm, "");
//             //     fs.writeFile(fileName + ".txt", textCSV, (err) => {
//             //         console.log(err);
//             //     })
//             // });
//         }
//     });
//     console.log(files)
// });

module.exports = {
    run_formatter_byte_stream
}