const missionservice = require('../services/missionservice');
const alertService=require('../services/missionservice')

class missionController{
    async add_mission_description(req,res){
        try {
            const data=req.body

            const response=await alertService.addMission(data)
            console.log("response",response);
            
            if (response) {
                res.status(200).json({
                  status: true,
                  message: "Description saved",
                  data:response
                });
              } else {
                res.status(400).json({
                  status: false,
                  message: "Error in saving the description",
                });
              }
            
        } catch (error) {
            res.status(500).json({
                "status":false,
                "message":error
            }) 
        }
    }
    async update_mission_activity(req,res){
        try {
            const id=req.body.id
            const data=req.body.data
            const response=await missionservice.updateMission(id,data)
            if (response) {
                res.status(200).json({
                  status: true,
                  message: "Mission activity updated",
                });
              } else {
                res.status(400).json({
                  status: false,
                  message: "Error in updating the mission activity",
                });
              }
            
        } catch (error) {
            res.status(500).json({
                "status":false,
                "message":error
            }) 
        }
    }
}
module.exports=new missionController()