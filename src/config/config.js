export const urlEnd = "https://jsonplaceholder.typicode.com"//"http://localhost:3000"; //front
export const urlLogin = urlEnd + "/login";

//captura de cabeceras pa envio token

export const getHeader = function () {
  try {
    //const auth = JSON.parse(atob(localStorage.getItem("token")));
    const token = sessionStorage.getItem('token');
    //headers: { "Authorization": `Bearer ${token}` }
    //cabeceras
    const headers = {
      Accept: "application/json",
      //Authorization: "bearer" + auth.acces_token,
     // Authorization: `Bearer ${token}`,
    };
    return headers;
  } catch (e) {
    localStorage.removeItem("token");
  }
};
