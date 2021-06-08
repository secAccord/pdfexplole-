let err = ''
const requestGetOptions = {
    method: 'GET',
    mode:'cors',
  };
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
            if(e.permission === 1){
            
            
                    if(pass == e.pass){
                        console.log('Zalogowano');
                    
                    }else{
                    
                }
                
               // break
             }else{
                err += `Użytkownik ${e.name} nie posiada uprawnień administratorskich`
            }
            
            
        }else{
           
        }
        });


        document.getElementById('error').textContent = err;
        err ='';
    })

    .catch(error => console.log('error', error));
});


