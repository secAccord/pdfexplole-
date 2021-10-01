if (sessionStorage.getItem("userInfo") == null) {
  location.href = "/login";
}
const App = () => {
  const [val, setVal] = React.useState("");
  const [addonMenu, showMenu] = React.useState(false);
  const [userMenu, showUserMenu] = React.useState(false);

  function userInfo() {
    const user = JSON.parse(sessionStorage.getItem("userInfo"));
    return user.name;
  }
  const logout = () => {
    sessionStorage.removeItem("userInfo");
    location.href = "/login";
  };

  const szukaj = () => {
    setVal(document.getElementById("input").value);
  };
  const showUM = () => {
    showUserMenu(!userMenu);
  };
  const showM = () =>{
    showMenu(!addonMenu)
  }

  return (
    <div>
      {userMenu && <UserMenu exit={showUM} user={userInfo()}/>}
      {addonMenu && <AddonsMenu exit={showM}/>}
      <div className="menu textCenter inline">
        <UserName user={userInfo()} show={showUM} />
        <InputSearch val={val} click={szukaj} />
    
        <div  onClick={showM} className='addonButton menuEle inline'><span className='center'>Dodaj</span></div>
        <div className="menuEle logout inline" onClick={logout}><i className="bi bi-box-arrow-in-right center"></i></div>
      </div>
      
      <FileList search={val}/>
      
      
     
    </div>
    
  );
};

const UserName = ({ user, show }) => (
  
  <h1 className="user menuEle" onClick={show}>
    
      <i className="bi bi-person-circle"></i> {user}
    
  </h1>
);
const InputSearch = ({ click }) => (
  <div className="search menuEle textCenter">
    <div className="input-group mb-3">
        <span className="input-group-text" id="inputGroup-sizing-default">Szukaj po nazwie</span>
        <input type="text" className="form-control" id='input' onChange={click} aria-label="Nazwa..." aria-describedby="inputGroup-sizing-default" />
    </div>
  </div>
);


const UserMenu = ({ exit, user }) => {
  
  
return (
    <div className="bg-menu">
      <div
        className="card border-dark mb-3 textCenter" style={{ width: 30 + "rem" }}>
        <div className="card-header"><button type="button" className="btn-close" aria-label="Close" onClick={exit}></button>Informacje o użytkowniku</div>
        <div className="card-body text-dark">
          <h5 className="card-title">Nazwa użytkownika: {user}</h5>
          <p className="card-text">
          <div className="input-group mb-3">
  <input type="password" className="form-control" placeholder="Zmiana hasła" aria-label="Zmiana Hasła" aria-describedby="button-addon2" />
  <button className="btn btn-outline-secondary" type="button" id="button-q">Zmień</button>
        </div>
          </p>
        </div>
      </div>
    </div>
  );
};
const AddonsMenu = ({ exit }) => {
  const [tab,selectTab] = React.useState(0)
  
  function changeTab0(){

    selectTab(0)

  }
  function changeTab1(){

    selectTab(1)

  }
    return (
        <div className="bg-menu">
          <div className="card text-center">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li>
                  <button style={{marginRight:10+'px'}}type="button" className="btn-close" aria-label="Close" onClick={exit}></button>
                </li>
                <li className="nav-item">
                  <a onClick={changeTab0} className={tab == 0 ? 'nav-link active':"nav-link"}>Plik PDF</a>
                </li>
                <li className="nav-item">
                  <a onClick={changeTab1} className={tab == 1 ? 'nav-link active':"nav-link"} >Kategoria</a>
                </li>
        
              </ul>
            </div>
              {tab==0 && <FileAddon />}
              {tab==1 && <CatAddon />}
  
          </div>
        </div>
      );
    };
const FileAddon =()=>{









  
  return(
    <div className="card-body">
              
            
    <h5 className="card-title">Wyślij PDF</h5>
    <form onSubmit={sendFile}>
    <div class="input-group mb-3">
        <span className="input-group-text" id="basic-addon3">Nazwa Pliku</span>
        <input name="inputName" type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" />
      </div>
      <div class="input-group mb-3">
        <input name="inputFile" class="form-control form-control-lg" id="formFileLg" type="file" />
      </div>
      <div class="input-group mb-3">
        <span className="input-group-text" id="basic-addon3">Rodzaj PDF</span>
        <select name='inputType' class="form-select" aria-label="Default select example" onClick={getType}>
          
        </select>
      </div>
       
       
        
        
        
    <input type='submit' value='Dodaj' className="btn btn-primary"/>
           
    </form>
    </div>
    
  )
}
const CatAddon =()=>{
  
  return(
    <div className="card-body">
              
            
    <h5 className="card-title">Dodaj Kategorie</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a className="btn btn-primary">Go somewhere</a>
    </div>
  )
}
const UserAddon =()=>{
  
  return(
    <div className="card-body">
              
            
    <h5 className="card-title">Dodaj Kategorie</h5>
              <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              <a className="btn btn-primary">Go somewhere</a>
    </div>
  )
const FileList = ({search})=>{
 
  

    
 
    
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://localhost:3000/api/admin/pdf", requestOptions)
    .then(response => response.json())
    .then(result =>{ 
      
      document.querySelector('#tbody').innerHTML = ' '
      result.forEach((e) => {
        if(e.name.toLowerCase().includes(search.toLowerCase()) || search == '')
        document.querySelector('#tbody').innerHTML += 
        `
        <div class='card folder text-center'>
            <div class='card-header'>${e.name}</div>
            <div class='card-body'>
                ${e.type} <br />
                ${e.categ} <br />
                ${e.addonData}
            </div>
            <div class='card-footer'>
                Dodane przez <span class='text-muted'>${e.author}</span>

            </div>
            

        </div>
        
       
       
       
        
        `
        
      });
     
      
      
      
      
      
      
      
      
      
      console.log(result)})
    .catch(error => console.log('error', error));
   
    
  return(
    
<div id='tbody'  className="inline fileList">
  
</div>



  )
}


ReactDOM.render(<App />, document.getElementById("app"));
