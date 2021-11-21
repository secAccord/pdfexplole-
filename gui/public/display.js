function getType(){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("/api/admin/type", requestOptions)
        .then(response => response.json())
        .then(result =>{
            
               result.forEach(x => {
                let adw = `<div class='catName' id='${x.raw_name}'><span onClick="vList('#${x.raw_name}')"><i class="bi bi-archive"></i> ${x.name}</span><ul class='d-none'>`
                  

                    x.catalogs.forEach(y=>{

                      adw += `<li onClick="sortLi('${y.name.toUpperCase()}')"><i class="bi bi-folder2"></i>  ${y.name}</li>`


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
                        <data>(${arr.data})</data> Loremdsaidhadfkahbfjaifokjiabn
                      </div>
                      <catalog class="badge bg-primary rounded-pill">${arr.catalog.displayName.toUpperCase()}</catalog>
                      <category class="badge bg-danger rounded-pill">${arr.category.name.toUpperCase()}</category>
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
  
    if(!li.querySelector('div').querySelector('div').textContent.toLowerCase().includes(e.value.toLowerCase())){
      li.classList.toggle('d-none')

    }



  })
 

}
document.querySelector('form').addEventListener('submit',e=>{

e.preventDefault()

})