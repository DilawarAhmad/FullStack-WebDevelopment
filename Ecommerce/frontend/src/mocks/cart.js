import axios from "axios";
class CartAPI {
  async fetchProduct(productId) {
    try {
      const { data } = await axios.get(`http://127.0.0.1:8000/api/products/${productId}/`);
      console.log(data);
      return data;
    } catch (error) {
      console.log("error fetching");
    }
  }
}

const cartAPI = new CartAPI();

export default cartAPI;