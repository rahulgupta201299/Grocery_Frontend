import express from 'express'
import path from 'path'
import connect from 'connect'
import serveStatic from 'serve-static'
const app=express()
var __dirname = path.resolve()
app.use(express.static(path.join(__dirname,'build')))


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build','index.html'));
  });

const port=8000||process.env.PORT

app.listen(port,()=>console.log(`listening to port ${port}`))