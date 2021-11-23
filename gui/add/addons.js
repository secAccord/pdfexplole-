document.querySelector('form').addEventListener('submit',(e)=>{
    let err = false;
    const errData = []
    e.preventDefault()
 
    const name = e.target.name.value
    const file = e.target.file.value
    const info = e.target.info.value
    const cate = e.target.catalog.value
    if(name == ''){
        e.target.name.focus()
        errData.push('nazwy')
        err = true
    } 
    if(file == ''){
        e.target.file.focus()
        errData.push('pliku')
        err = true
    } 
    if(info == ''){
        e.target.info.focus()
        errData.push('opisu')
        err = true
    } 
    if(cate == ''){
        e.target.catalog.focus()
        errData.push('katalogu')
        err = true
    }
    const author = JSON.parse(sessionStorage.getItem('userInfo')).name;
if(!err){
    const myHeaders = new Headers();
myHeaders.append("Authorization", "xWjC3zdynbIAAAAAAAAAAbxi5rtJ17xXIOi-pk4x8d9Du_WoD5282ecg30OeKsE6");

const formdata = new FormData();
    formdata.append("file", e.target.file.files[0], file);
    formdata.append("name", name);
    formdata.append("categ", cate);
    formdata.append("info", info);
    formdata.append("author", author)

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch("/api/uploadFile", requestOptions)
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



});
