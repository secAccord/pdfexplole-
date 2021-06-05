const requestGetOptions = {
    method: 'GET',
    mode:'cors',
  };
document.querySelector('form').addEventListener('submit',el =>{
    el.preventDefault();
    const login = el.target.elements.login.value;
    const pass = el.target.elements.pass.value;
    console.log(login)
fetch("http://localhost:3000/api/admin/users", requestGetOptions)
    .then(response => response.json())
    .then(result => {

        //console.log(result)
        console.log( `Zarejestrowane konta (${result.length})`);
        result.forEach(e => {

            if(login == e.name){
                if(pass == e.pass){
                    console.log('Zalogowano');
                    //break
                }else{
                    console.error('Złe hasło');
                }
               // break
            }else{
                console.error('Brak użytkownika w bazie');
            }
            
            
        });



    })
    .catch(error => console.log('error', error));
});
