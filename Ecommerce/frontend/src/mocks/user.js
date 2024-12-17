import axios from 'axios'

class UserApi {
    async getUserDetails() {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            const config = {
                headers:{
                Authorization:`Bearer ${token}`
                }
            };
            const {data} = await axios.get("/api/users/" , config);
            return data;
        }
        catch(error){
            throw error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        }
    }
    
    async createUser(name, email, password) {
        try {
            const config ={
                headers: {
                    'Content-type' : 'application/json',
                }
            };
            const {data} =await axios.post("http://127.0.0.1:8000/api/users/register/" ,{name , email,password},config);
            return data;
        
        }
        catch(error) {
            throw error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        }
    }
    
    async updateUser(userId , updateData) {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            const config = {
                headers : {
                    Authorization : `Bearer ${token}`,
                }
            };
            const {data} = await axios.put("http://127.0.0.1:8000/api/users/profile/update/" , updateData , config);
            return data;
        }
        catch(error) {
            throw error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        }
    }

    async deleteUser(userId) {
        const token = JSON.parse(localStorage.getItem("userInfo")).token;
        console.log("token got");
        const config = {
            headers : {
                Authorization: `Bearer ${token}`
            }
        };
        await axios.delete(`http://127.0.0.1:8000/api/users/delete/${userId}/`, config);
        console.log("user deleted");
    }
    catch(error) {
        throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
    }

    async loginUser(email,password) {
        try{
            const {data} = await axios.post("http://127.0.0.1:8000/api/users/login/" , {username: email, password: password});
            
            return data;
        }
        catch(error) {
            throw error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message;
        }
    }
}
const userAPI = new UserApi();
export default userAPI;