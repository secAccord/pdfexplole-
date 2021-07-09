if(sessionStorage.getItem('logintoken') == null){
    document.body.innerHTML ='You have not permission'
}
document.querySelector('user').innerHTML = userName()




function logout(){
    sessionStorage.removeItem('logintoken')
    location.href = '/login'
}
function userName(){
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    return userInfo.name
}