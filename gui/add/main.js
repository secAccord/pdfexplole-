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
                v += `<option value=${i}>${e.name}</option>`;
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
      
      fetch("/api/admin/catalog", requestOptions)
        .then(response => response.json())
        .then(result => {
            let v = ''
                result.forEach((e,i) => {
                    if(parseInt(e.category) == section[0].value){
                        v += `<option value=${i}>${e.displayName}</option>`;
                    }
                });
            
                section[1].innerHTML = v;
    
    
        })
        .catch(error => console.log('error', error));
    }
generateCategory()
generateCatalog()
