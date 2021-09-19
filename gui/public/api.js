let useType = false;
let useCategory = false;

function getType(e){
if(!useType){
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:3000/api/admin/type", requestOptions)
        .then(response => response.json())
        .then(result =>{
          //console.log(e.target)
               result.forEach(arr => {
                    
                    const option = document.createElement('option')
                    option.value = arr.name
                    option.textContent = arr.displayName
                   e.target.appendChild(option) 
                
                
                
                });
                useType = !useType









        })
        .catch(error => console.log('error', error));
    
    }



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
