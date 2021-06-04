const engine  = require('./engine/main')
const port  = process.env.PORT || 3000;
engine.listen(port, ()=> {
    console.log('Server is up on port ' + port)
})
