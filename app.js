const engine  = require('./engine/main')
const port  = process.env.PORT || 80;
engine.listen(port, ()=> {
    console.log('Server is up on port ' + port)
})
