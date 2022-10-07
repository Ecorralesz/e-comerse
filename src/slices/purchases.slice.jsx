import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import getConfig from "../utils/getConfig";
import { setCart } from "./cart.slice";
import { setIsLoading } from "./isLoading.slice";

export const purchasesSlice = createSlice({
  name: "purchases",
  initialState: [],
  reducers: {
    setPurchases: (state, action) => {
      return action.payload;
    },
  },
});

export const getPurchasesThunk = () => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
      getConfig()
    )
    .then((res) => dispatch(setPurchases(res.data.data.purchases)))
    .finally(() => dispatch(setIsLoading(false)));
};

export const addCartThunk = (cart) => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/cart", 
    cart,
    getConfig()
    )
        .then(() => dispatch(getPurchasesThunk()))
        .finally(() => dispatch(setIsLoading(false)));
}

export const purchaseCardThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", {}, getConfig())
        .then(() => dispatch(dispatch(setCart([]))))
        .finally(() => dispatch(setIsLoading(false)));
}

export const { setPurchases } = purchasesSlice.actions;

export default purchasesSlice.reducer;
