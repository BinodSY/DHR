import workerModel from '../models/workerModel.js';
import supabase from '../services/supabaseClient.js';




// Create a new worker
export const createWorker = async (req, res) => {
    try {
        const worker = new workerModel(req.body);
        const savedWorker = await worker.save();
        res.status(201).json({
            success: true,
            worker: savedWorker
        });
    } catch (error) {
        console.error("Create worker error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }
}

export const showHealthCard= async(req,res)=>{
    const {health_id}=req.body;
    if(!health_id) return res.json({health_id:"health id is missing"})
    
    try{
        const healthCard=await workerModel.getHealthCard(supabase,health_id)

        return res.json({ success:"true",healthCard})
    }catch(error){
        console.error("Get worker health card error:", error);
        res.status(500).json({
            error: "Internal server error",
            details: error.message
        });
    }

}