// import express from "express";
// import multer from "multer";
// import path from "path"
// const app=express();
// const storage=multer.diskStorage({
//     destination:'practise',
//     filename:(req,file,cb)=>{
      
        
//     cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));

//     }
// })
// app.use(express.json());

// const upload=multer({storage,
//     limit:{
//         filesize:1024000
//     }

// });
// app.use(express.urlencoded({extended:true}))
// app.post("/form",upload.single('avatar'),(req,res)=>{
//         console.log(req.file);
//         res.send(`this is it ${req.file.filename}`)
// })
// app.listen(3000, () => console.log('Server running at http://localhost:3000'));
// app.post("/about",express.json(),(req,res)=>{
//     const {name,email}=req.body;
//     res.json({
//         message:`${name}  thi sis ${email}`
//     })

// })
// app.listen(3000,()=>{
//     console.log('server is reuuning http://localhost:3000')
// })   
//!!!!!!!!!!!!!!!! THIS IS PARAS EXAMPLE
// app.get('/pr/:category/:id', (req, res) => {
//   const { category, id } = req.params;
//   res.json({
//     category,
//     id,
//     message: `Product ID ${id} in category ${category}`
//   });
// });
// app.listen(3000,()=>{
//      console.log('server is reuuning http://localhost:3000')
// //  })


// app.use("/ee",(err,req,res,next)=>{
//     err.error("error is real my boy")

// })
// app.get("/ee",(req,res)=>{
//    throw new error("this is error")
// })
// app.listen(3000,()=>{
//     console.log(`${port}`);
// })