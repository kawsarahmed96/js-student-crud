

const getDataLs = (key)=>{
  const lsData = localStorage.getItem(key);
  if(lsData){
    return JSON.parse(lsData)
  }else{
    return false;
  }
}



const sendDataLs = (key,data)=>{
  const lsData = localStorage.getItem(key);
  let newData;
  if(lsData){
    newData= JSON.parse(lsData)
  }else{
    newData= [];
  }

  newData.push(data)
  localStorage.setItem(key,JSON.stringify(newData))
}
