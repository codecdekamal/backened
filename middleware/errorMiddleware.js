const errorMiddleware = (err,req,res,next)=>{
       if(err){
        console.error(err)
         res.status(500).json({ error: "Internal Server Error" });
       }
       next()

}
module.exports = errorMiddleware;