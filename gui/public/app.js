if(sessionStorage.getItem('logintoken') == null){

    location.href ='/login'
}
document.querySelector('#user').innerHTML = `Witaj ${userName()}`




function logout(){
    sessionStorage.removeItem('logintoken')
    location.href = '/login'
}
function userName(){
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    return userInfo.name
}
document.querySelector('#add').addEventListener('click',e=>{

    document.querySelector('#addPanel').style.display = 'block';


})
document.querySelector('#Off').addEventListener('click',e=>{

    document.querySelector('#addPanel').style.display = 'none';


})