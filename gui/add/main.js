if (sessionStorage.getItem("userInfo") == null) {
    location.href = "/";
  }
const section = document.querySelectorAll('select')
const nick = JSON.parse(sessionStorage.getItem('userInfo')).name;
document.querySelector('header').textContent = `Edytujesz jako ${nick}` ;

const generateCategory =()=>{
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("/api/admin/category", requestOptions)
    .then(response => response.json())
    .then(result => {
        let v = ''
            result.forEach((e,i) => {
                v += `<option value=${e.id}>${e.name}</option>`;
            });
            
            section[0].innerHTML = v;


    })
    .catch(error => console.log('error', error));
}
const generateCatalog = () =>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("/api/admin/category", requestOptions)
        .then(response => response.json())
        .then(result => {
            let v = ''
                result[section[0].value].catalogs.forEach((e,i) => {
                    
                        v += `<option value=${e.id}>${e.name}</option>`;
               
                });
            
                section[1].innerHTML = v;
    
    
        })
        .catch(error => console.log('error', error));
    }
generateCategory()
generateCatalog()
