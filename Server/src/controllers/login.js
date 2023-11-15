const { User } = require('../DB_connection')

const login = async( req, res) => {
    try {
        const { email, password } = req.query
        if(!email || !password){
            return res.status(400).send('Faltan datos')
        }

        const user = await User.findOne({
            where: { email: email }
        })

        if (!user) return res.status(404). send('Usuario no encontrado.')

        if(user.password === password){
            return res.json({
                access: true
            })
        } else {
            return res.status(403).send('Constraseña incorrecta.')
        }
    } catch (error) {
        return res.status(500).json(error.message)
        
    }
}

module.exports = login;
//login antes de database
// const users = require("../utils/users");

// const login = (req, res) => {
//     const { email, password } = req.query;
//     let access = false;

//     users.forEach((user) => {
//         if(user.email === email && user.password === password) {
//             access = true;   
//         }
//     });

//     return res.json({ access });
// }

// module.exports = login;