import axios from 'axios';
const Api_URL='http://localhost:8000';
export const uploadFile=async(data)=>{
    try{
        let res=await axios.post(`${Api_URL}/upload`,data); 
        return res.data;
    }catch(err){
        console.error(err.message);
    }
}