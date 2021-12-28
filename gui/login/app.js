const requestGetOptions = {
    method: 'GET',
    mode:'cors',
  };

function tokenGenerator(perm){
    let permission = ''
    if(perm === 1){
        permission = 'A'
    }else{
        permission = 'U'
    }
    const data = new Date();
    const dataDay = data.getDay()
    const random = Math.floor(Math.random()*100+1)
    return `${permission}${random**dataDay}`
}



document.querySelector('form').addEventListener('submit',el =>{
    el.preventDefault();
    const login = el.target.elements.login.value;
    const pass = el.target.elements.pass.value;
    console.log(login)
fetch("/api/admin/users", requestGetOptions)
    .then(response => response.json())
    .then(result => {

        //console.log(result)
        console.log( `Zarejestrowane konta (${result.length})`);
        result.forEach(e => {

            if(login == e.name){
                if(pass == e.pass){
                    tokenGenerator(e.permission)
                    sessionStorage.setItem('logintoken',tokenGenerator(e.permission))
                    sessionStorage.setItem('userInfo',JSON.stringify(e))
                    location.href ='/menu'
                    //break
                }else{
                    
                }
                
               // break
            }else{
            
            }
            
            
        });



    })
    .catch(error => console.log('error', error));
});
