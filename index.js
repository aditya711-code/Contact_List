const express=require('express');
const port=8000;
const path=require('path');
const db=require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());//use act as a middleware
app.use(express.static('assets'));
//middleware1 can override each other
// app.use(function(req,res,next){
//    req.myName="Aditya";
//     console.log('middle ware1 is called');
//     next();
//
// })
// app.use(function(req,res,next){
//     console.log("My Name is: ",req.myName);
//     console.log('middle ware2 is called');
//     next();
//
// })
var contactList=[
    {
        name:"Aditya",
        phone:"8779342314"
    },
    {
        name:"Parth",
        phone:"9076247240"
    },
    {
        name:"Stark",
        phone:"9867497823"
    }
]
app.get('/',function(req,res){
    Contact.find({},function(err,contacts){
        if(err)
        {
            console.log("Error in fetching contacts from DB",err);
            return;
        }
        return res.render('home',{
            title:'Contact List',
            contact_list:contacts
        })
    });
    // console.log("Name from controller is",req.myName);
   
});
app.get('/',function(req,res){
    // console.log(__dirname);
    // response.send('<h1>Cool!it is running or is it??</h1>');
    return res.render('home',{title:"Contact List"});
})
app.get('/practice',function(req,res){
   return res.render('practice',{
       title:"LEt's play wtih ejs"
   })
})
app.post('/create-contact',function(req,res){
   //console.log(req);
   //  contactList.push({
   //          name:req.body.name,
   //          phone:req.body.phone
   //  });
   // contactList.push(req.body);
    // console.log(req.body);
    // console.log(req.body.name);
    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err)
        {
            console.log("Error in creating a contact",err);
            return;
        }
        console.log('*****',newContact);
    })
    return res.redirect('back');
})
// app.get('/delete-contact/:phone',function(req,res){
//     console.log(req.params)
    
//     let phone=req.query.phone;
//     let contactListIndex=contactList.findIndex(contact=>contact.phone==phone);
//     if(contactListIndex!=-1)
//     {
//         contactList.splice(contactListIndex,1);
//     }
//     return res.redirect('back');
// })
app.get('/delete-contact',function(req,res){
    // console.log(req.query);
    //get the unique id
    let id=req.query.id;
    //find the contact by itsId and using function delete it
    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log("error in deleting an object from database",err);
            return;
        }

    });
    // let contactListIndex=contactList.findIndex(contact=>contact.phone==phone);
    // if(contactListIndex!=-1)
    // {
    //     contactList.splice(contactListIndex,1);
    // }
    return res.redirect('back');
})
// app.post('/delete-contact/',function(req,res){//this will only get the elements present at the end of the array and delte them
//     contactList.pop(req.body);
//      return res.redirect('back');
// });


app.listen(port,function(err){
    if(err)
    {
        console.log("Error in running the server",err);
        return;
    }
    console.log("My express sever is running on port",port);
});