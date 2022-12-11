//based on minifilm app
const joi = require('joi')

/* rules for registration */
const registerVal = (data) => {
    const schemaVal = joi.object({
        username:joi.string().required().min(3).max(30),
        email:joi.string().required().min(6).max(37).email(),
        password:joi.string().required().min(4).max(27)
    })
    return schemaVal.validate(data)
}

/* rules for user logging in */
const loginVal = (data) => {
    const schemaVal = joi.object({  
        email:joi.string().required().min(6).max(37).email(),
        password:joi.string().required().min(4).max(27)    
    })
    return schemaVal.validate(data)
}

/* rules for comment */
const commentVal = (data) => {
    const schemaVal = joi.object({
    description:joi.string().required().min(3).max(100)
    })
    return schemaVal.validate(data)
}

/* rules for post */
const postVal = (data) => {
    const schemaVal = joi.object({
        title:joi.string().required().min(4).max(128),
        description:joi.string().required().min(3).max(128)
    })
    return schemaVal.validate(data)
}

module.exports.registerVal = registerVal
module.exports.loginVal = loginVal
module.exports.postVal = postVal
module.exports.commentVal = commentVal