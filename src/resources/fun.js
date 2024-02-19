function bodyOfPostRequest(body={},header={}) {
  return {
    method  :'POST',
    headers : {'content-type':'application/json','set-cookie':'SameSite=None',...header},
    body    : JSON.stringify(body)
  }
}
function getCookie(cname) {
  if(process.browser){
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
}
function setCookie(cname, cvalue, exdays) {
  if(process.browser){
    let d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
}
export default {
  getCookie,
  setCookie,
  bodyOfPostRequest,
}