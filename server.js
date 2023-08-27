const express = require('express')
const app = express()
const common = require('./common')
const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const port = process.env.port || 3000
const pathToFetchData = "https://www.chessgames.com/chessecohelp.html";


app.get('/', async (req, res) => {
    try {
        const response = await common.getDataFromUrl(pathToFetchData);
        res.send(response)      
    } catch (error) {
        console.log(error)
    }
})

app.get('/:id', function (req, res, next) {
    const id = req.params.id;
    if(myCache.has( id )) {
        return res.send(myCache.get(id));
    } else {
        let data = common.EcoData[req.params.id];
        if(data) {
            myCache.set(id,data,'180');    
        }
        return res.send(data || 'No Data Available At Source.')
    }
})

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(port, () => {
  console.log(` APP Running On http://localhost:${port}`)
})
