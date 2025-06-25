//second method of wrapper function using promise :

// const asynchandler=(requesthandler)=>{
//   return (req,res,next)=>{
//       return Promise.resolve(requesthandler(req,res,next))
//       .catch((err)=> next(err))
//     }
// }
// export {asynchandler};

//wrapper function using asyn await method 1;
const asynchandler=(fn)=>async(req,res,next)=>{
     try{
 await fn(req,res,next);
     }catch(error){
        res.status(error.code || 500).json({
             sucess:false,
            message:error.message 
         })
     }
 }
 export {asynchandler}