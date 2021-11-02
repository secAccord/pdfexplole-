function getType(){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:3000/api/admin/type", requestOptions)
        .then(response => response.json())
        .then(result =>{
           //let adw = '' 
            document.querySelector("#adw").innerHTML = ''
               result.forEach(arr => {
                   
                    const a = document.createElement('div')                    
                    a.textContent = arr.displayName
                    //document.querySelector("#adw").appendChild(a) 
                    

                  
                
                });
                

           







        })
        .catch(error => console.log('error', error));
    
    



}
function getPdf(){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:3000/api/admin/pdf", requestOptions)
        .then(response => response.json())
        .then(result =>{
           //let adw = '' 
            //document.querySelector("#adw").innerHTML = ''
               result.forEach(arr => {
                   
                    const div = document.createElement('div')
                    div.className = 'block'
                    const name = document.createElement('p') 
                    const data = document.createElement('p') 
                    const category = document.createElement('p')
                    const catalog = document.createElement('p')                        
                    name.textContent = `${arr.name} [${arr.author}] `;
                    data.textContent = `(${arr.data})`;
                    category.textContent = `Kategoria: ${arr.category.name}`;
                    catalog.textContent = `Katalog: ${arr.catalog.displayName}`;
                    div.appendChild(name) 
                    div.appendChild(data) 
                    div.appendChild(category) 
                    div.appendChild(catalog) 
                    document.querySelector('#adw').appendChild(div)
                  
                
                });
                

           







        })
        .catch(error => console.log('error', error));
    
    



}


function sendFile(e){
    let err = false;
    const errData = []
    e.preventDefault()
 
    const name = e.target.inputName.value
    const file = e.target.inputFile.value
    const type = e.target.inputType.value
    const cate = e.target.inputCate.value
    if(name == ''){
        e.target.inputName.focus()
        errData.push('nazwy')
        err = true
    } 
    if(file == ''){
        e.target.inputFile.focus()
        errData.push('pliku')
        err = true
    } 
    if(type == ''){
        e.target.inputType.focus()
        errData.push('typu')
        err = true
    } 
    if(cate == ''){
        e.target.inputCate.focus()
        errData.push('katalogu')
        err = true
    }
    const author = JSON.parse(sessionStorage.getItem('userInfo')).name;
if(!err){
    const myHeaders = new Headers();
myHeaders.append("Authorization", "xWjC3zdynbIAAAAAAAAAAbxi5rtJ17xXIOi-pk4x8d9Du_WoD5282ecg30OeKsE6");

const formdata = new FormData();
    formdata.append("file", e.target.inputFile.files[0], file);
    formdata.append("name", name);
    formdata.append("categ", cate);
    formdata.append("type", type);
    formdata.append("author", author)

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("http://localhost:3000/api/uploadFile", requestOptions)
  .then(response => response.status)
  .then(result => {
      
    
    if(result == 401) alert('Ten plik już jest na serwerze')
    if(result == 200) alert('Dodano plik')
    if(result == 500) alert('Problem z dodaniem pliku')
    e.target.inputName.value = ''
    e.target.inputFile.value = ''
    e.target.inputType.value = ''
    e.target.inputCate.value = ''





})
  .catch(error => console.log('error', error));
 
}else{

errData.forEach(e=>alert( `Brak ${e}`))

}



}
