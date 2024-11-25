import axios from 'axios';
const Api_URL='https://filesharing-backend-gz28.onrender.com';
export const uploadFile=async(data)=>{
    try{
        let res=await axios.post(`${Api_URL}/upload`,data,{
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }); 
        return res.data;
    }catch(err){
        console.error(err.message);
    }
}