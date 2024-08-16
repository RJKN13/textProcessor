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
  //console.log(req.body)
    const uploadedFileContent = req.body.text
  
        // change the text to lowercase & replace special characters
        const words = uploadedFileContent
            .toLowerCase()           
            .replace(/[^\w\ ]/g, '') 
            .split(/\ +/);           

        // word count for every occurrence
        const wordCount = {};
        for (const word of words) {
            if (word) { 
                wordCount[word] = (wordCount[word] || 0) + 1;
            }
        }

        // find the most repeated word
        let maxCount = 0;
        let mostRepeatedWord = '';
        for (const word in wordCount) {
            if (wordCount[word] > maxCount) {
                maxCount = wordCount[word];
                mostRepeatedWord = word;
            }
        }
        
        // reame and replace the text 
        const renameWord = "foo" + mostRepeatedWord.concat("bar")
        const modifiedText = uploadedFileContent.replaceAll(mostRepeatedWord, renameWord)
  
  res.json(modifiedText)   
  })