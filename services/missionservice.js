const missionModel=require('../models/missionmodel')

class missionService{

    async addMission(data){    
        const response=await missionModel(data)
        return response.save()
        
    }
    async updateMission(id,data){
        const updatemission=await missionModel.updateOne(
            {_id:id},
            {
                $set:{
                    active:data.status
                }
            }
        )
        return updatemission
    }
}

module.exports=new missionService();