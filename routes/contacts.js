var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');
var bodyParser = require('body-parser');

////////////////////// GET ////////////////////
router.get('/', function (req, res, next) {
    

    Contact.find()
        .exec(function(err, contacts){
            if(err){
                console.log("get call -----------error");
                return res.status(500).json({
                    title:'An error occured',
                    error: error
                });
            }
            
            console.log("get call -----------success");
            res.status(200).json({
                title: 'Success',
                obj: contacts
            });
    });
});
////////////////////// PATCH //////////////////////////

router.patch('/:id',function(req, res, next){
    
     Contact.findById(req.params.id,function(err, contact){
        if(err){
            return res.status(500).json({
                title: 'An error occured',
                error: err
            });
        }
        if(!contact){
            return res.status(500).json({
                title: 'Message not found ',
                error: err
            });
        }
       
        
        contact.ImageUrl = req.body.ImageUrl;
        contact.Name = req.body.Name;
        contact.Number = req.body.Number;
        contact.Email = req.body.Email;
        contact.bFavourite = req.body.bFavourite;

        
        
        // console.log(contact.ImageUrl)
        // console.log(contact.Name)
        // console.log(contact.Number)
        // console.log(contact.Email)
        // console.log(contact.bFavourite)

        
        

        contact.save(function(err, result){
            if(err){
                console.log("patch call -----------error");
                return res.status(500).json({
                    title:'An error occured',
                    error: err
                });
            }
            console.log("patch call -----------success");
            res.status(200).json({
                title: 'Contact Updated',
                obj: result
            });
        });

   }); 
});


//////////////////// POST ///////////////////////////

router.post('/', function (req, res, next) {
    
    console.log("---------------------");
    console.log(req.body);
    console.log("---------------------");
    
    
    var contact = new Contact({
        ImageUrl:     req.body.ImageUrl,
        Name:         req.body.Name,
        Number:       req.body.Number,
        Email:        req.body.Email,
        bFavourite:   req.body.bFavourite,
    });


    contact.save(function(err, result){
        if(err){
            return res.status(500).json({
                title : 'An error occurred',
                error: err
            });
            
        }
        res.status(201).json({
            message : 'Saved message',
            obj: result
        });
        });
});

//////////////////// DELETE ///////////////////////////
router.delete('/:id',function(req, res, next){
    Contact.findById(req.params.id,function(err, contact){
         if(err){
             return res.status(500).json({
                 title: 'An error occured',
                 error: err
             });
         }
         if(!contact){
             return res.status(500).json({
                 title: 'Message not found ',
                 error: err
             });
         }
         
         
 
         contact.remove(function(err, result){
             if(err){
                 return res.status(500).json({
                     title:'An error occured',
                     error: error
                 });
             }
             res.status(200).json({
                 title: 'Contact Deleted',
                 _id: result
             });
         });
 
    }); 
 });


module.exports = router;
