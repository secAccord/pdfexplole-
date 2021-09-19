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
      <nav className="menu textCenter">
        <UserName user={userInfo()} show={showUM} />
        <InputSearch val={val} click={szukaj} />
        <Logout click={logout} />
        <div  onClick={showM} className='addonButton menuEle'><i className="userAnim bi bi-file-earmark-plus-fill"></i>Dodaj</div>
      </nav>
    <div className="row">
      <div className='leftMenu col-3'>Boczne Menu</div>
      <div className='tabelMenu col-8'><FileList /></div>
    </div>
    </div>
  );
};

const UserName = ({ user, show }) => (
  <h1 className="user menuEle" onClick={show}>
    <span className="userAnim">
      <i className="bi bi-person-circle"></i>
    </span>{" "}
    {user}{" "}
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
const Logout = ({ click }) => (
  <div className="menuEle logout" onClick={click}>
    <i className="bi bi-box-arrow-in-right"></i>{" "}
    <span className="logoutAnim">Wyloguj</span>
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
  <button className="btn btn-outline-secondary" type="button" id="button-addon2">Zmień</button>
        </div>
          </p>
        </div>
      </div>
    </div>
  );
};
const AddonsMenu = ({ exit }) => {
  //const kat = ['pdf','cat','type']
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
      </div><div class="input-group mb-3">
        <span className="input-group-text" id="basic-addon3">Katalog</span>
        <select name='inputCate' class="form-select" aria-label="Default select example">
          <option value="wroclaw-2012">Wrocław 2012</option>
          <option value="katowice-2019">Katowice 2019</option>
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
const FileList = ()=>{
 
  

    
 
    
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://localhost:3000/api/admin/pdf", requestOptions)
    .then(response => response.json())
    .then(result =>{ 
      
      document.querySelector('tbody').innerHTML = ' '
      result.forEach((e,i) => {
        document.querySelector('tbody').innerHTML += 
        `
        <tr>
        <th scope="row">${i+1}</th>
        <td>${e.name}</td>
        <td>${e.author}</td>
        <td>${e.type}</td>
        <td>${e.categ}</td>
        <td>${e.addonData}</td>
        <td></td>
        </tr>
`
        
      });
     
      
      
      
      
      
      
      
      
      
      console.log(result)})
    .catch(error => console.log('error', error));
   
    
    /*<tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>*/



  return(
    
    <table  className="table table-hover">
  <thead>
    <tr>
      <th scope="col">Index</th>
      <th scope="col">Nazwa</th>
      <th scope="col">Autor</th>
      <th scope="col">Typ</th>
      <th scope="col">Katalog</th>
      <th scope="col">Data</th>
      <th scope="col">Akcje</th>
    </tr>
  </thead>
  <tbody >
  
  </tbody>
</table>



  )
}


ReactDOM.render(<App />, document.getElementById("app"));
