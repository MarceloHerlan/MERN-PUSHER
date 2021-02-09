import express from 'express'
import mongoose from 'mongoose'
import Messages from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'

//app config
const app=express()
const port=9000

const pusher = new Pusher({
    appId: "1108229",
    key: "82c70e7304338d164ea0",
    secret: "6e5523b707b14e59ada9",
    cluster: "eu",
    useTLS: true
  });

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


//DB config
const db=mongoose.connection

db.once('open',()=>{
    console.log('db connected');
    const msgCollection=db.collection('messages')
    const changeStream=msgCollection.watch();
    changeStream.on('change',(change)=>{
        console.log('cambio ocurrio',change);

        if (change.operationType ==='insert'){
            const messageDetails=change.fullDocument;
            pusher.trigger('messagescontents','inserted',
            {
                name:messageDetails.name,
                message:messageDetails.message,
                timestamp:messageDetails.timestamp,
                received:messageDetails.received, 
            }
    );
            
        }else{ console.log('error triggering')
    }

    });
});
  


  
const connection_url='mongodb+srv://lobo:1234@cluster0.kcqpt.mongodb.net/mern?retryWrites=true&w=majority'
mongoose.connect(connection_url,
{useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true })



//api routes
app.get('/',(req,res)=>res.status(200).send('hello world'))

app.get('/messages/sync',(req,res)=>{
    Messages.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

app.post('/messages/new', (req,res)=>{
    const dbMessage=req.body

    Messages.create(dbMessage,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.listen(port,()=>console.log(`listening on: ${port}`))