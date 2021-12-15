if (sessionStorage.getItem("userInfo") == null) {
  location.href = "/";
}
function getType(){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("/api/admin/category", requestOptions)
        .then(response => response.json())
        .then(result =>{
            
               result.forEach(e => {
                let adw = `<div class='catName' id='${e.raw_name}'><span onClick="vList('#${e.raw_name}')"><i class="bi bi-archive"></i> ${e.name}</span><ul class='d-none'>`
                 

                    e.catalogs.forEach(y=>{

                      adw += `<li onClick="sortLi('${y.raw_name.toUpperCase()}')"><i class="bi bi-folder2"></i>  ${y.name}</li>`


                    })
                
                    
                    adw += `</ul></div>`
                    document.getElementById('categoryList').innerHTML += adw
                
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
                        <div class="fw-bold">${arr.name}</div>
                        <data>(${arr.data})</data> ${arr.info}
                      </div>
                      <catalog class="badge bg-primary rounded-pill">${arr.catalog.toUpperCase()}</catalog>
                      <category class="badge bg-danger rounded-pill">${arr.category.toUpperCase()}</category>
                    </li>
                `
               
                });
                

           







        })
        .catch(error => console.log('error', error));
    
    



}

getPdf()
getType()

function sortLi(x){

        const li = document.querySelector('ol').querySelectorAll('li')
        li.forEach(e =>{
          const name = e.querySelector('catalog').textContent
          //console.log(name)
          e.classList.remove('d-none')

          if(name != x){

            e.classList.toggle('d-none')

          }
          

        });



}
function vList(e){
  document.querySelector(e).querySelector('ul').classList.toggle('d-none')
  //e.querySelector('ul').classList.toggle('d-none')
}
function search(e){
  const x = document.querySelector('ol').querySelectorAll('li')
  x.forEach(li =>{
  
    li.classList.remove('d-none')

    if(!li.querySelector('div').querySelector('div').textContent.toLowerCase().includes(e.value.toLowerCase())){
      li.classList.toggle('d-none')

    }



  })
 

}
document.querySelector('form').addEventListener('submit',e=>{

e.preventDefault()

})