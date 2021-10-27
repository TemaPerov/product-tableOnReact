import styles from "./ProductTable.module.css";
import React, { useState } from "react";
import { makeStyles, StylesProvider } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";
import SortProduct from "../../componets/SortProduct/SortProduct";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  getDataFunk,
  removeDataFunck,
  changeSateOfWindowDetail,
  getOneDataFunk,
} from "../../store/actions/index";
import { url } from "../../utils/api";
import DeteilWindow from "../../componets/DeteilWindow/DeteilWindow";

const useStyles = makeStyles({
  root: {
    width: 200,
    margin: 10,
  },
  media: {
    height: 140,
  },
});

const ProductTable = () => {
  const [numId, setNumId] = useState();
  const filtrList = useSelector((store) => store.listReduser.filtrProductList);

  const classes = useStyles();
  const dispatch = useDispatch();

  const removeClick = (id) => {
    const confirm = window.confirm("remove this product?");
    if (confirm) {
      dispatch(removeDataFunck(url, id));
    }
  };

  const detailClick = (id) => {
    dispatch(changeSateOfWindowDetail(true));
    setNumId(id);
    dispatch(getOneDataFunk(url + `?id=${id}`));
  };
  useEffect(() => {
    dispatch(getDataFunk(url));
  }, []);

  return (
    <>
      <SortProduct />

      <div className={styles.container}>
        {filtrList &&
          filtrList.map((item) => (
            <Card className={classes.root} key={item.id}>
              <CardActionArea>
                {item.imageUrl && (
                  <CardMedia
                    className={classes.media}
                    image={item.imageUrl}
                    title="Contemplative Reptile"
                  />
                )}
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Count: {item.count}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Weight: {item.weight}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => detailClick(item.id)}
                >
                  Details
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => removeClick(item.id)}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          ))}

        {numId && <DeteilWindow props={numId} />}
      </div>
    </>
  );
};

export default ProductTable;
