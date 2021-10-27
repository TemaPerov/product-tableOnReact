import axios from "axios";



export const getData = async (url) => {
  const data = await axios.get(url)
  console.log(data)
  return data;
};
export const getOneData = async (url) => {
  const data = await axios.post(url)
  return data;
};


export const sendData = async (url,obj) => {
  const data = await axios.post(url,obj)
  return data;
};
export const putData = async (url,obj) => {
 const data = await axios.patch(url,obj)

  return data;
};

export const removeData = async (url,id) => {
  const data = await axios.delete(url+`/${id}`)
  return data;
};




