import styles from "./DeteilWindow.module.css";
import Button from "@material-ui/core/Button";

import { useDispatch, useSelector } from "react-redux";
import {
  changeSateOfWindowDetail,
  getOneDataFunk,
  patchDataFunck,
} from "../../store/actions";
import { putData } from "../../utils/network";

import { url } from "../../utils/api";
import { useState, useEffect } from "react";
import EditForm from "../EditForm/EditForm";

const DeteilWindow = ({ props }) => {
  const [edit, setEdit] = useState(false);
  const [coment, setComent] = useState();
  const dispatch = useDispatch();

  const stateWidow = useSelector((store) => store.listReduser.stateWidowDetail);
  const oneProduct = useSelector((store) => store.listReduser.oneProduct);
  const [comentOn, setComentOn] = useState(false);

  const clearComentsArea = () => {
    setComentOn(false);
    setComent("");
  };
  const exitClick = () => {
    dispatch(changeSateOfWindowDetail(false));
    setEdit(false);
    clearComentsArea();
  };
  const hendleText = (e) => {
    setComent(e.target.value);
  };
const getComentFunc=()=>{
  setTimeout(()=>{
    dispatch(getOneDataFunk(url + `?id=${props}`))
  },500)
}
  const sendComent = () => {
    if (oneProduct.coments) {
      putData(url + `/${props}`, { coments: [...oneProduct.coments, coment] });
      clearComentsArea();
      getComentFunc()
    } else if (!oneProduct.coments) {
      console.log(coment);
      dispatch(patchDataFunck(url + `/${props}`, { coments: [coment] }));
      clearComentsArea();
      getComentFunc()
    }
  };

  const comentOnFunch = () => {
    setComentOn(true);
  };
  const exitFromComentArrea = () => {
    clearComentsArea();
  };
  const editClick = () => {
    if (edit) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  };
  const removeComent = (i) => {
    const confirm = window.confirm("remove this coment?");
    if (confirm) {
      const comentRem = oneProduct.coments.filter((el, index) => index !== i);
      dispatch(patchDataFunck(url + `/${props}`, { coments: comentRem }));
      getComentFunc()
    }
  };
  useEffect(()=>{
    setEdit(false)
    return(()=>{
      setEdit(false)
      setComentOn(false)
    })
  },[])
  return (
    <>
      {stateWidow && (
        <div className={styles.container} open={stateWidow}>
          {edit ? (
            <EditForm oneProduct={oneProduct} />
          ) : (
            <>
              <div className={styles.contentBox}>
                <div className={styles.imgBox}>
                  <img src={oneProduct.imageUrl} alt="product" />
                </div>

                <div className={styles.textBox}>
                  <h1>{oneProduct.name}</h1>
                  <p>count: {oneProduct.count}</p>
                  {oneProduct.size && (
                    <p>
                      width:{oneProduct.size.width}
                      <br />
                      height:{oneProduct.size.height}
                    </p>
                  )}
                  <p>weight:{oneProduct.weight}</p>
                </div>
              </div>
              <div className={styles.comentBox}>
                <h2>Coments about product</h2>
                <div className={styles.comentText}>
                  {oneProduct.coments &&
                    oneProduct.coments.map((item, i) => (
                      <p key={i}>
                        {item}
                        <button onClick={() => removeComent(i)}>Х</button>
                      </p>
                    ))}
                </div>
                {!comentOn ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    href="#outlined-buttons"
                    onClick={comentOnFunch}
                  >
                    Add comment
                  </Button>
                ) : (
                  <>
                    <textarea
                      className={styles.textareaBox}
                      onChange={hendleText}
                      value={coment}
                    ></textarea>

                    <Button
                      variant="outlined"
                      color="primary"
                      href="#outlined-buttons"
                      onClick={sendComent}
                    >
                      Add comment
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      href="#outlined-buttons"
                      onClick={exitFromComentArrea}
                    >
                      Exit
                    </Button>
                  </>
                )}
              </div>
            </>
          )}

          <div className={styles.button}>
            {edit ? (
              <Button size="small" color="primary" onClick={editClick}>
                Back
              </Button>
            ) : (
              <Button size="small" color="primary" onClick={editClick}>
                Edit
              </Button>
            )}

            <Button size="small" color="primary" onClick={exitClick}>
              Exit
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeteilWindow;
