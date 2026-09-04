const express = require('express')
const Event = require('../models/eventmodel');
const mongoose = require('mongoose')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//require auth for all event routes
router.use(requireAuth)


router.get("/", async(req, res)=>{
    const user_id = req.user._id
    try{ 
        const showAll = await Event.find({user_id}).sort({createdAt: -1});

        res.status(201).json(showAll);
    }catch(error){
        res.status(400).json({error: error.message});
        console.log('An error occured', error)
    }
})

router.post("/", async(req, res)=>{
    const {title, date, location, description} = req.body;

    try{
         const user_id = req.user._id 
        const eventAdded =  await Event.create({
            title: title,
            date: date,
            location: location,
            description: description,
            user_id: user_id
        })

        res.status(201).json(eventAdded)
    } catch(error){
        res.status(400).json({error: error.message});
        console.log('An error occured', error)
    }
});

router.get('/:id', async(req, res)=>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such event'})
    }
    const event = await Event.findOne({_id: id, user_id: req.user._id});
    try{
        if(!event){
            return res.status(404).json({error: "Event not found"})
        }
        res.status(200).json(event)
    }catch(error){
        return res.status(404).json({error: error.message})
    }
})

router.delete('/:id', async(req, res)=>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such event'})
    }

    try{
        const deleteEvent = await Event.findOneAndDelete({_id: id, user_id: req.user._id})

        if(!deleteEvent){
            return res.status(404).json({error: 'No such event'})
        }

        res.status(201).json(deleteEvent);
    }catch(error){
        res.status(400).json({error: error.message});
    }
});

router.put('/:id', async(req, res)=>{
    const {id} = req.params

     if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such event'})
    }
    const {title, date, location, description} = req.body;

    try{
        const updateEvent = await Event.findOneAndUpdate(
           { _id: id, user_id: req.user._id },
            req.body,
            { new: true })

    if(!updateEvent){
            return res.status(404).json({error: 'No such event'})
        }
        res.status(201).json(updateEvent);
    }catch(error){
        res.status(404).json({error: error.message});
    }
    
})

module.exports = router;

