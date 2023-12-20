const mongoose = require("mongoose")
const connect = async(url)=>{
    try {
        await mongoose.connect(url)
        console.log("success")
    } catch (error) {
        console.log(error.message)
    }
}
module.exports = connect