
import axios from 'axios'

class ProductAPI{
   async getProductList(keyword='') {
    try{

        const {data} = await axios.get(`http://127.0.0.1:8000/api/products/all/${keyword}`);
        return data;
    }
    catch (error) {
        throw error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message;
      }
    
   }

   async getProductDetails(productId) {
    try{ 
        const {data} = await axios.get(`http://127.0.0.1:8000/api/products/${productId}/`);
        return data;
    }
    catch(error) {
        throw error.response && error.response.data.detail
    ? error.response.data.detail
    : error.message;
    }
}

    async createProductReview(productId,review){
        try {
            const token =JSON.parse(localStorage.getItem("userInfo")).token;
            const config ={
                headers:{
                    'Content-type':'application/json',
                    Authorization: `Bearer ${token}`
                }
            }
            
            const {data} = await axios.post(`http://127.0.0.1:8000/api/products/${productId}/reviews/` , review, config);
            return data;
        }
        catch(error) {
            console.log("Error in creating product Review");
        }
    }

    async getTopRatedProducts() {
        try{
            const {data} = await axios.get("http://127.0.0.1:8000/api/products/top/");
            return data;
        }
        catch(error) {
            throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
        }
    }
}

const productAPI = new ProductAPI();
export default productAPI;

 {/*async getProductList(keyword='' ,pageNumber='') {
        try{
            const {data} = await axios.get(`/api/products${keyword}`,{
                params:{
                    page : pageNumber,
                }
            });
            return data;
        }
        catch(error) {
            throw error.response && error.response.data.detail
        ? error.response.data.detail
        : error.message;
        }
    }
    
    */}