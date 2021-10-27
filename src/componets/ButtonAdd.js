
import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { changeSateOfForm } from "../store/actions";

const ButtonAdd = () => {
  const dispatch = useDispatch();
  const clickFunk = () => {
    dispatch(changeSateOfForm(true));
  };
  return (
    <>
      <Button color="primary" onClick={clickFunk}>
        Add product
      </Button>
    </>
  );
};

export default ButtonAdd;
