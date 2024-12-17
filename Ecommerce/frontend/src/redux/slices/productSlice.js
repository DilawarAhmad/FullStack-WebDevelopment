import {createSlice} from '@reduxjs/toolkit'
import productAPI from '..//../mocks/product.js'

const initialState= {
    productList : {products:[],loading:false , error: null},
    productDetails : {product: {reviews: []}, loading:false , error: null},
    createReview : { loading : false , error : null, success: false},
    topRatedProducts : {products: [], loading: false , error : null}
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers :{
        productListRequest(state){
            state.productList.loading = true;
            state.productList.error = false;
        },
        productListSuccess(state, action){
            state.productList.products = action.payload;
            state.productList.loading=false;
            //state.productList.pages = action.payload.pages;
            //state.productList.page = action.payload.page;
        },
        productListFailure(state , action){
            state.productList.loading=false;
            state.productList.error = action.payload;
        },
        productDetailRequest(state){
            state.productDetails.loading=true;
            state.productDetails.error = null;
        },
        productDetailSuccess(state , action){
            state.productDetails.product= action.payload;
            state.productDetails.loading = false;
        },
        productDetailFailure(state , action){
            state.productDetails.loading = false;
            state.productDetails.error = action.payload;
        },

        createReviewRequest(state){
            state.createReview.loading=true;
            state.createReview.error = null;
        },
        createReviewSuccess(state , action){
            state.createReview.success =true;
            state.createReview.loading=false;
            state.createReview.error = null;
        },
        createReviewFailure(state , action){
            state.createReview.success= false;
            state.createReview.loading = false;
            state.createReview.error = action.payload;
        },
        productTopRequest(state){
            state.topRatedProducts.loading= true;
            state.topRatedProducts.error=null;
        },
        productTopSuccess(state, action){
            state.topRatedProducts.products = action.payload;
            state.topRatedProducts.loading = false;
        },
        productTopFailure(state , action){
            state.topRatedProducts.loading = false;
            state.topRatedProducts.error = action.payload;
        }
    }
});export const {
    productListRequest,
    productListSuccess,
    productListFailure,
    productDetailRequest,
    productDetailSuccess,
    productDetailFailure,
    createReviewRequest,
    createReviewSuccess,
    createReviewFailure,
    productTopRequest,
    productTopSuccess,
    productTopFailure,
  } = productSlice.actions;

export const fetchProductList =(keyword) =>async (dispatch)=>{
    try{
        dispatch(productListRequest());
        const productList = await productAPI.getProductList(keyword);
        dispatch(productListSuccess(productList));
    }
    catch(error){
        dispatch(productListFailure(error.response ?.data.detail || error.message));
    }
}

export const fetchProductDetails = (productId) =>async (dispatch) =>{
    try{
        dispatch(productDetailRequest());
        const product = await productAPI.getProductDetails(productId);
        dispatch(productDetailSuccess(product));
    }
    catch(error){
        dispatch(productDetailFailure(error.response ?.data.detail || error.message));
    }
}

export const createReview = (productId , review) => async (dispatch) =>{
    try{
        dispatch(createReviewRequest());
        const revieww = await productAPI.createProductReview(productId,review);
        dispatch(createReviewSuccess(revieww));

    }
    catch(error){
        dispatch(createReviewFailure(error.response ?.data.detail || error.message));
    }

}

export const fetchTopRatedProducts = () => async (dispatch) =>{
   try{
    dispatch(productTopRequest());
    const topProducts = await productAPI.getTopRatedProducts();
    dispatch(productTopSuccess(topProducts));
   }
catch(error){
    dispatch(productTopFailure(error.response ?.data.detail || error.message));
}
}

export const { reducer } = productSlice;
export default productSlice;