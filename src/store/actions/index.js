import {
  GET_DATA,
  STATE_FORM,
  STATE_WINDOW_DETAIL,
  GET_ONE_PRODUCT,
  GET_DATA_FILTR,
} from "../constats/actionTypes";
import { getData, sendData, removeData, putData } from "../../utils/network";


export const getMainList = (data) => ({
  type: GET_DATA,
  payload: data,
});

export const getFiltrList = (data) => {
  return { type: GET_DATA_FILTR, payload: data };
};

export const changeSateOfForm = (data) => ({
  type: STATE_FORM,
  payload: data,
});
export const changeSateOfWindowDetail = (data) => ({
  type: STATE_WINDOW_DETAIL,
  payload: data,
});
export const getOneProduct = (data) => ({
  type: GET_ONE_PRODUCT,
  payload: data,
});

export function getDataFunk(url) {
  return async (dispatch) => {
    try {
      const data = await getData(url);

      dispatch(getMainList(data.data));
    } catch (e) {
      alert("You must on JSON-server - json-server --watch db.json");
    }
  };
}

export function getOneDataFunk(url) {
  return async (dispatch) => {
      try{  const data = await getData(url);
        dispatch(getOneProduct(data.data[0]));}
      catch(e){
        alert("You must on JSON-server - json-server --watch db.json");
      }
  
  };
}
export function sendDataFunck(url, obj) {
  return async (dispatch) => {
      try{
        const data = await sendData(url, obj);
        dispatch(getDataFunk(url));
      }catch(e){
        alert("You must on JSON-server - json-server --watch db.json");
      }

  };
}
export function removeDataFunck(url, id) {
  return async (dispatch) => {
      try{
        const data = await removeData(url, id);
        dispatch(getDataFunk(url));
      }catch(e){
        alert("You must on JSON-server - json-server --watch db.json");
      }
   
  };
}

export function patchDataFunck(url, obj) {
  return async (dispatch) => {
    try {
      await putData(url, obj);
    } catch (e) {
      alert("Problem with server" + e);
    }
  };
}
