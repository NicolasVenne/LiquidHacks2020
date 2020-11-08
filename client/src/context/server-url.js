export const getServerUrl = () => {
  if(process.env.NODE_ENV === 'production') {
    return process.env.REACT_APP_PROD_SERVER_URL
  } else {  
    console.log(process.env.REACT_APP_LOCAL)
    if(process.env.REACT_APP_LOCAL === "true") {
      return process.env.REACT_APP_LOCAL_SERVER_URL
    } else {
      return process.env.REACT_APP_DEV_SERVER_URL
    }
  }
}