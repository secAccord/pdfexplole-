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

  return (
    <div>
      {userMenu && <UserMenu exit={showUM} user={userInfo()}/>}
      {addonMenu && <AddonsMenu exit={showMenu}/>}
      <nav className="menu textCenter">
        <UserName user={userInfo()} show={showUM} />
        <InputSearch val={val} click={szukaj} />
        <Logout click={logout} />
      </nav>

      <div>{}</div>
    </div>
  );
};

const UserName = ({ user, show }) => (
  <h1 className="user menuEle" onClick={show}>
    <span className="userAnim">
      <i class="bi bi-person-circle"></i>
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
    <i class="bi bi-box-arrow-in-right"></i>{" "}
    <span className="logoutAnim">Wyloguj</span>
  </div>
);

const UserMenu = ({ exit, user }) => {
  
  
return (
    <div className="bg-menu">
      <div
        className="card border-dark mb-3 textCenter" style={{ width: 30 + "rem" }}>
        <div className="card-header"><button type="button" class="btn-close" aria-label="Close" onClick={exit}></button>Informacje o użytkowniku</div>
        <div className="card-body text-dark">
          <h5 className="card-title">Nazwa użytkownika: {user}</h5>
          <p className="card-text">
          <div class="input-group mb-3">
  <input type="password" class="form-control" placeholder="Zmiana hasła" aria-label="Zmiana Hasła" aria-describedby="button-addon2" />
  <button class="btn btn-outline-secondary" type="button" id="button-addon2">Zmień</button>
        </div>
          </p>
        </div>
      </div>
    </div>
  );
};
const AddonsMenu = ({ exit, user }) => {
  
  
    return (
        <div className="bg-menu">
         
        </div>
      );
    };
ReactDOM.render(<App />, document.getElementById("app"));
