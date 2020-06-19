
import app from './app/app.js'
import config from './config/index.js'
import  Sequelize  from 'sequelize';

const dbQueryString = `mysql://${config.DDBB.USER}:${config.DDBB.PASS}@${config.DDBB.HOST}:${config.DDBB.PORT}/${config.DDBB.NAME}`

const sequelize = new Sequelize(dbQueryString) 

sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection has been established successfully.')
        
        app.listen(config.SERVER_PORT, () => {
            console.log(`Server is running at port ${config.SERVER_PORT}`)
        })
    })
    .catch(err => console.error('Unable to connect to the database:', err))


export default sequelize



// db.query("SELECT * FROM user").success(function(myTableRows) {
//     console.log(myTableRows)
//   })




// function loginValid(req, res, next) {
//     console.log('Path:' + req.path)
//     if (req.query.userName == null || req.query.userName !== 'ana') {
//         res.status(400)
//             .json('not a valid user!')

//     }
//     else {
//         console.log('Ana is valid! ')
//         next()
//     }
// }

// //server.use(loginValid)


// // This one is to handle general Express errors:
// server.use(function (err, req, res, next) {
//     if (!err) return next();
//     console.log('Error, algo salio mal', err);
//     res.status(500).send('Error');
// })


// server
  
//     .get('/users/', loginValid, (req, res) => {
//         res.status(200)
//             .json(restoAPI)
//     })




//     .post('/users/', (req, res) => {

//         const { name, lastname, birthDate } = req.body;

//         if (!name || !lastname || !birthDate) {
//             res.status(400)
//                 .json(`Missing data: ${name} - ${lastname} - ${birthDate}`)
//         }
//         else {
//             restoAPI.push({
//                 name: name,
//                 lastname: lastname,
//                 birthDate: birthDate
//             })

//             res.status(200)
//                 .json(restoAPI[restoAPI.length - 1])
//             console.log("User added!")
//             restoAPI.forEach(elem => console.log(elem))
//         }
//     })

//     .get('/users/:id', (req, res) => {

//         const { id } = req.params;

//         const user = restoAPI.find(elem => elem.id == id)

//         if (!user) {
//             res.status(404)
//                 .json(`User not found! ID: ${id}`)
//         }
//         else {
//             res.status(200)
//                 .json(user)
//             console.log("User found!")

//         }
//     })


//     .delete('/users/:id', (req, res) => {

//         const { id } = req.params;

//         const index = restoAPI.findIndex(elem => elem.id == id)
//         console.log(index)
//         if (index === -1) {
//             res.status(404)
//                 .json(`User not found! ID: ${id}`)
//         }
//         else {
//             const user = restoAPI.find(elem => elem.id == id)
//             restoAPI.splice(index, 1)
//             console.log(restoAPI)

//             res.status(200)               
//                 .json(user)

//         }
//     })


// server.listen(config.SERVER_PORT, () => {
//     console.log('Server is running!!!')
// })
