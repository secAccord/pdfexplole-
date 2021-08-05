const App = () => {
const [val,setVal] = React.useState('')
const [addonMenu,showMenu] = React.useState(false)
function userInfo(){
    const user = JSON.parse(sessionStorage.getItem('userInfo'));
    return user.name
}

const szukaj =()=>{
    setVal(document.getElementById('input').value)
}

    return (
    <div>
    <nav className='menu'>
    <UserName user={userInfo()} />
    <InputSearch val={val} click={szukaj}/>
    </nav>
    <div>{val}</div>

    
    </div>
    )
    
  }
 


const UserName = ({user}) =>(

    <h1 className="user menuEle"> Witaj {user} </h1>

    );
const InputSearch  = ({click}) => (
<div className='search menuEle'>
    <input id='input' className='input' type='text' placeholder='Szukaj po nazwie'></input>
    <button className='button' onClickCapture={click}>Szukaj</button>
</div>
)
  ReactDOM.render(
   <App />,
    document.getElementById('app')
  );
  