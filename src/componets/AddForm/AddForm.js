import styles from "./AddForm.module.css";
import React from "react";
import { Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {useRef} from "react"
import { sendDataFunck, changeSateOfForm } from "../../store/actions";
import * as Yup from "yup";
import { url } from "../../utils/api";


const AddForm = () => {
  const formRef = useRef()
  const dispatch = useDispatch();
  const open = useSelector((store) => store.listReduser.stateForm);

  const handleClose = () => {
    dispatch(changeSateOfForm(false));
  };
  const cancelFunk = () => {
    dispatch(changeSateOfForm(false));
    formRef.current.reset()
  };

  const SignupSchema = Yup.object({
    name: Yup.string().required("Enter name"),
    imageUrl: Yup.string().required("Put image url"),
    count: Yup.string().required("Enter count"),
    weight: Yup.string().required("Enter weight"),
  });

  return (
    <>
      {open &&
        <div className={styles.box} open={open}> 
          <h1>Add products</h1>
          <Formik 
            initialValues={{
              comments: [],
              imageUrl: "",
              name: "",
              count: "",
              size: {
                width: "",
                height: "",
              },
              weight: "",
            }}
            validationSchema={SignupSchema}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              handleClose();
              dispatch(sendDataFunck(url, values));
              setSubmitting(false);
              resetForm({ values: "" });
            }}
          >
            {(props) => (
              <form
              ref={formRef} 
                className={styles.form}
                id="form"
                onSubmit={props.handleSubmit}
              >
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
                  <button type="submit">Send</button>
                  <button type="reset" onClick={props.resetForm}>
                    Reset
                  </button>
                  <button type="button" onClick={cancelFunk}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
           }
             
    </>
  );
};

export default AddForm;
