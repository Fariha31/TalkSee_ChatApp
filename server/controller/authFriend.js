const { User } = require("../models/User");
exports.sendFriendRequestController = async (req, res) => {
    const{friendId, myId,myName, myProfileImg ,myEmail} =req.body
    User.findByIdAndUpdate
    (  friendId,{
        $push: {friendRequests: { name: myName, id: myId , email:myEmail, profileImg:myProfileImg}}
    },{
        new:true, useFindAndModify: false
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
      User.findByIdAndUpdate(myId,{
           $push: {sentRequests: friendId}
      },{new:true, useFindAndModify: false}).select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
          res.status(400).json({
      errorMessage: "accept FR controller error",
    });
      })

    }
    )
}
exports.cancelFriendRequestController = async (req, res) => {
    const{friendId,  myId } =req.body
         User.findByIdAndUpdate(friendId,
                { $pull: { friendRequests: { id: myId } } },
                {new:true, useFindAndModify: false},(err,result)=>{
        if(err){
           return res.status(400).json({
            errorMessage: "accept FR controller error",
    });
        }
           User.findByIdAndUpdate(myId,
                { $pull: {sentRequests: friendId  }},
                {new:true, useFindAndModify: false})
                .select("-password").then(result=>{
          res.json(result)
      }).catch(err=>{
                        return res.status(400).json({
                         errorMessage: "accept FR controller error",
    });
      })
    })
}
exports.acceptFriendRequestController = async (req, res) => {
    const{friendId,friendName,friendProfileImg, myId,myName,myProfileImg} =req.body
      User.findByIdAndUpdate(friendId ,
                { $pull: { sentRequests:   myId  }},
                {new:true, useFindAndModify: false
                 },(err,result)=>{
                  if(err){
                    return res.status(422).json({error:err})
                     }
            User.findByIdAndUpdate( myId ,
                { $pull: {friendRequests: { id: friendId }}},
                { new:true, useFindAndModify: false},
                (err,result)=>{
              if(err){
                   return res.status(422).json({error:err})
                      }
             User.findByIdAndUpdate(friendId ,
                {$push: { friends: {
                            name: myName,
                            id: myId,
                            profileImg: myProfileImg,
                           // chatId: chatDoc._id
                        }}}
            ,{ new:true, useFindAndModify: false},(err,result)=>{
                  if(err){
                   return res.status(422).json({error:err})
                         }
            User.findByIdAndUpdate(myId,
                {$push: {
                        friends: {
                            name: friendName,
                            id: friendId,
                            profileImg: friendProfileImg,
                            //chatId: chatDoc._id
                        }
                    }
                },
            {new:true, useFindAndModify: false})
            .then(result=>{
                     return res.status(200).json({
                    successMessage: "Friend request cancelled"})
                    }).catch(err=>{
                        return res.status(400).json({
                         errorMessage: "accept FR controller error",
                });
             })
            })          
          })          
        })
}
exports.rejectFriendRequestController = async (req, res) => {
        const{friendId, myId} =req.body
         User.findByIdAndUpdate(friendId,
                { $pull: { sentRequests: myId   }},
                {new:true, useFindAndModify: false},(err,result)=>{
                if(err){
                 return res.status(400).json({
                 errorMessage: "accept FR controller error",
                     })}
                     
        User.findByIdAndUpdate( myId ,
                { $pull: {friendRequests: { id: friendId }}},
                {new:true, useFindAndModify: false})
                .then(result=>{
          res.json(result)
      }).catch(err=>{
                        return res.status(400).json({
                         errorMessage: "accept FR controller error",
        });
      })
    })
}
exports.deleteFriendController = async (req, res) => {
    const{friendId, myId} =req.body
          User.findByIdAndUpdate(friendId ,
            { $pull: { friends: { id: myId } }}
            ,{new:true, useFindAndModify: false},(err,result)=>{
              if(err){
               return res.status(400).json({
                 errorMessage: "accept FR controller error",
    })}
             User.findByIdAndUpdate(myId,
                { $pull: { friends: { id: friendId } }},
                 {new:true, useFindAndModify: false})
                .then(result=>{
                     return res.status(200).json({
                    successMessage: "Friend request cancelled"})
                    }).catch(err=>{
                        return res.status(400).json({
                         errorMessage: "accept FR controller error",
    });
      })})
}
exports.getFriendRequestsController =  async (req, res) => {

 try {
    let data = await User.findById(req.params.id, {friendRequests:true});
    if (!data)
      return res.status(400).json({
        errorMessage: "ID is not Present",
      });
    return res.send(data.friendRequests);
  } catch (err) {
    return res.status(400).json({
      errorMessage: "Invalid ID",
    });
  }
    
};
exports.getSentFriendRequestsController =  async (req, res) => {

 try {
    let data = await User.findById(req.params.id);
    if (!data)
      return res.status(400).json({
        errorMessage: "ID is not Present",
      });
    return res.send(data);
  } catch (err) {
    return res.status(400).json({
      errorMessage: "Invalid ID",
    });
  }
    
};

