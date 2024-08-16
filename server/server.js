import express from 'express'

const server = express()
const port = 3000

// express now includes a built-in JSON body parser
server.use(express.json())

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
   
// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})

server.post('/api/process-text', async (req, res) => {
    const uploadedFileContent = req.body.text
    
    // Split the text with new line, space,feed, tab, carriage return    
    const words = uploadedFileContent        
        .split(/[\n\s\r\t\f]+/)
        .map(item => item.trim());
    
    const removePunctuation = str => str.replace(/[^\w\s]|_/g, '');
    const cleanedArray = words.map(removePunctuation);
   
    // word count for every occurrence
    const wordCount = {};
    for (const word of cleanedArray) {        
        if (word) { 
            wordCount[word] = (wordCount[word] || 0) + 1;
        }
    }

    // find the most repeated word and add to list
    let maxCount = 0;
   let mostRepeatedWords = [];

    for (let word in wordCount) {
        if (wordCount[word] > maxCount) {
            maxCount = wordCount[word];
            mostRepeatedWords = [word];
        } else if (wordCount[word] === maxCount) {
            mostRepeatedWords.push(word);
        }
    }
    
    // rename and replace the text     
    let modifiedText = ''
    if (mostRepeatedWords.length > 0) {
        for (let index in mostRepeatedWords) {
            if (modifiedText == '') {
                modifiedText = uploadedFileContent
            }
        console.log ("The word '"+mostRepeatedWords[index]+ "' has appeared "+maxCount+ " times") 
        const renameWord = "foo" + mostRepeatedWords[index].concat("bar")
        modifiedText = modifiedText.replaceAll(new RegExp("\\b"+mostRepeatedWords[index]+"\\b", 'g'), renameWord)    
        }        
    }   
  
  res.send(modifiedText)   
  })