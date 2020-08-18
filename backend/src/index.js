               require('dotenv').config()
const config = require('./config')

// init
const app = require('./app')
            require('./database')

const main = async () => {
    await app.listen(app.get('port'))
    console.log(`Servidor en el puerto ${app.get('port')}`)
}
main() 