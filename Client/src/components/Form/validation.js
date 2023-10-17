const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const regexNumber = /\d/

const validation = (userData, errors, setErrors) => {

let newErrors = errors // {}

// validaciones

if(!userData.email) newErrors.email = "El email es requerido"
else if(!regexMail.test(userData.email)) newErrors.email = "El email es invalido"
else newErrors.email = ""

if(!userData.password) newErrors.password = "El password es requerido"
else if(!regexNumber.test(userData.password)) newErrors.password = "Debe ingresar un numero"
else newErrors.password = ""

setErrors(newErrors)
// return newErrors
}

export default validation