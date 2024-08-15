import express from 'express'

const server = express()
const port = 3000

// express now includes a built-in JSON body parser
server.use(express.json())
   
// Start the server
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
