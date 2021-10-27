import {GET_DATA,STATE_FORM,STATE_WINDOW_DETAIL,GET_ONE_PRODUCT,GET_DATA_FILTR} from '../constats/actionTypes'

const initialState ={
productList:[],
filtrProductList:[],
oneProduct: [],
stateForm: false,
stateWidowDetail:false
}

const  listReduser = (state = initialState,action)=>{
   switch (action.type) {
       case GET_DATA:
               return{
                   ...state,
                   productList: action.payload,
                   filtrProductList: action.payload
               }
       case GET_DATA_FILTR:
      
      
               return{
                   ...state,
                   filtrProductList: [...action.payload]
               }
       case STATE_FORM:
               return{
                   ...state,
                   stateForm: action.payload
               }
       case STATE_WINDOW_DETAIL:
               return{
                   ...state,
                   stateWidowDetail: action.payload
               }
       case GET_ONE_PRODUCT:
               return{
                   ...state,
                   oneProduct: action.payload
               }
     
       default:
           return state

   }
}

export default listReduser;