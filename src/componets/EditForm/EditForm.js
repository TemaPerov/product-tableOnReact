import styles from "./EditForm.module.css";
import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import {changeSateOfForm, getDataFunk,changeSateOfWindowDetail } from "../../store/actions";
import * as Yup from "yup";
import { url } from "../../utils/api";
import { putData } from "../../utils/network";



const EditForm = ({oneProduct}) => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(changeSateOfForm(false));
  };

  const SignupSchema = Yup.object({
    name: Yup.string().required("Enter name"),
    imageUrl: Yup.string().required("Put image url"),
    count: Yup.string().required("Enter count"),
    weight: Yup.string().required("Enter weight"),
  });
  const saveConfirm=()=>{
    const confirm = window.confirm("save change?");
    if (confirm) {
        dispatch(getDataFunk(url));
    }
  }
  useEffect(()=>{
      return(()=>{
        saveConfirm()
      })
  },[])
  return (
    <>
      {" "}
      <Formik
      className={styles.formBox}
        initialValues={{
          comments: oneProduct.comments,
          imageUrl: oneProduct.imageUrl,
          name:oneProduct.name,
          count: oneProduct.count,
          size: {
            width: oneProduct.size.width,
            height: oneProduct.size.height,
          },
          weight: oneProduct.weight,
        }}
        validationSchema={SignupSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          handleClose();
        putData(url + `/${oneProduct.id}`, values);
      
        dispatch(changeSateOfWindowDetail(false));
          setSubmitting(false);
          resetForm({ values: "" });
        }}
      >
        {(props) => (
          <form className={styles.form} id="form" onSubmit={props.handleSubmit}>
            <p>Name</p>
            <Field
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
              name="name"
            />
            {props.touched.name && props.errors.name && (
              <div>{props.errors.name}</div>
            )}

            <p>Img URL</p>

            <input
              type="url"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              name="imageUrl"
              value={props.values.imageUrl}
            />
            {props.touched.imageUrl && props.errors.imageUrl && (
              <div>{props.errors.imageUrl}</div>
            )}
            <p>Numders</p>
            <input
              type="number"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.count}
              name="count"
            />
            {props.touched.count && props.errors.count && (
              <div>{props.errors.count}</div>
            )}
            <p>Width</p>
            <input
              type="number"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.size.width}
              name="size.width"
            />

            <p>Height</p>
            <input
              type="number"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.size.height}
              name="size.height"
            />

            <p>Weight</p>
            <input
              type="number"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.weight}
              name="weight"
            />
            {props.touched.weight && props.errors.weight && (
              <div>{props.errors.weight}</div>
            )}

            <div className={styles.buttonBox}>
              <Button type="submit">Send</Button>
          
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default EditForm;
