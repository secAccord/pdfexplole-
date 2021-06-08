const printer = document.querySelector('#userlist')
const requestGetOptions = {
    method: 'GET',
    mode:'cors',
  };
  
const loadUser = () => fetch("/api/admin/users", requestGetOptions)
    .then(response => response.json())
    .then(result => {

        console.log(result)
        printer.innerHTML += `Zarejestrowane konta (${result.length}):<br />`
        result.forEach(e => {

            printer.innerHTML += `<i>${e.name}</i><br />`;
            
        });



    })
    .catch(error => console.log('error', error));



    loadUser()