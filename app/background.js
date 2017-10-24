//import User from src/User;

function init() {
  // usuário setado
  const user = new User();

  user.getData().then((data) => {

    console.log("data", data);
    if ('email' in data){
      return openWindow("popup.html");
    }
    
    return openWindow("config.html");
  })

  if (!user.getEmail()){
  }

}

init();
