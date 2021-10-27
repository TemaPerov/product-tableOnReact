import styles from "./SortProduct.module.css";
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import {getFiltrList} from "../../store/actions/index"

import ButtonAdd from '../ButtonAdd';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    
    },
  },
}));

const SortProduct = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
   const productList = useSelector((store) => store.listReduser.productList);
  


     const onclickFunk=(sortBy)=>{
         switch(sortBy){
             case "Count":
          
                productList.sort((a,b)=>a.count - b.count)
                dispatch(getFiltrList(productList))  
                break
             case "CountIncrease":
                productList.sort((a,b)=>b.count - a.count)     
                dispatch(getFiltrList(productList))
                break
             case "Name":
                productList.sort((a,b)=>a.name.localeCompare(b.name))     
                dispatch(getFiltrList(productList))
                break
             case "NameIncrease":
                productList.sort((a,b)=>b.name.localeCompare(a.name))     
                dispatch(getFiltrList(productList))
                break
                default: return productList
         }
     }

    return (
        <div className={styles.box}>
      <div className={classes.root}>
          
          <h1>Sort product</h1>
        <Button variant="outlined" color="primary" onClick={()=>onclickFunk("Name")}>
          For Name a-b
        </Button>
        <Button variant="outlined" color="primary" onClick={()=>onclickFunk("NameIncrease")}>
          For Name b-a
        </Button>
        <Button variant="outlined" color="primary" onClick={()=>onclickFunk("Count")}>
         For count 1-2
        </Button>
        <Button variant="outlined" color="primary" onClick={()=>onclickFunk("CountIncrease")}>
         For count 2-1
        </Button>
        
       
      </div>

      <ButtonAdd/>
</div>
    
    
    );
};

export default SortProduct;

