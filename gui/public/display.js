document.querySelector('user').innerText= 'Dawid'
function getType(){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("/api/admin/type", requestOptions)
        .then(response => response.json())
        .then(result =>{
           //let adw = '' 
               result.forEach(arr => {
                   
                                    
                    
                document.querySelector('#categoryList').innerHTML += `<button type="button" class="list-group-item bg-dark text-white border-white"><i class="bi bi-folder"></i> ${arr.displayName}</button>` 
                    

                  
                
                });
                

           







        })
        .catch(error => console.log('error', error));
    
    



}
function getPdf(){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("/api/admin/pdf", requestOptions)
        .then(response => response.json())
        .then(result =>{
           //let adw = '' 
            //document.querySelector("#adw").innerHTML = ''
               result.forEach(arr => {
                   
                document.querySelector('#fileList').innerHTML += 
                `
                  <li class="list-group-item d-flex justify-content-between align-items-start">
                      <div class="ms-2 me-auto">
                        <div class="fw-bold">${arr.name} </div>
                        <data>(${arr.data})</data> Loremdsaidhadfkahbfjaifokjiabn
                      </div>
                      <span class="badge bg-primary rounded-pill"> ${arr.catalog.displayName.toUpperCase()} </span>
                       <span class="badge bg-danger rounded-pill"> ${arr.category.name.toUpperCase()}</span>
                    </li>
                `
               
                });
                

           







        })
        .catch(error => console.log('error', error));
    
    



}

getPdf()
getType()