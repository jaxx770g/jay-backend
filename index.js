
const express=require("express");
const app=express();

app.get('/api/jokes',(req,res)=>{
   const jokes=[
        {id:1,
            name:"Why did the chicken cross the road? To get to the other side!"},
        {id:2,
            name:"Why don't scientists trust atoms? Because they make up everything!"},
        {id:3,
            name:"What do you call fake spaghetti? An impasta!"},
        {id:4,
            name:"Why did the scarecrow win an award? Because he was outstanding in his field!"}
    ];
    res.json(jokes);


});
const port= process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});