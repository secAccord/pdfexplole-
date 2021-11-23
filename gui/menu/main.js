if (sessionStorage.getItem("userInfo") == null) {
    location.href = "/";
  }
const nick = JSON.parse(sessionStorage.getItem('userInfo')).name;
  document.querySelectorAll('div')[0].innerHTML = `<h1>Witaj ${nick}</h1>`
const logout = () => {
    sessionStorage.removeItem("userInfo");
    location.href = "/";
  };