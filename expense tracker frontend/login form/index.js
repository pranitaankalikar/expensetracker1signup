const subtn= document.getElementById("subtn");
subtn.addEventListener("click",mysignup);
function mysignup(e){
    e.preventDefault();
    console.log(document.getElementById("suname").value);
    const signupInfo={
        name: document.getElementById("suname").value,
        email: document.getElementById("suemail").value,
        contact: document.getElementById("sucontact").value,
        password: document.getElementById("supassword").value
    }
    
    console.log(signupInfo);
    axios.post('http://localhost:7000/user/signup',signupInfo)
    .then((result)=>{
        console.log("succesful");
        showNotification("Successfuly registered",false);


    })
    .catch((err)=>{
        console.log(err);
        showNotification("Fail to register",true);


    });
    document.querySelector('form').reset();

}
function showNotification(message, iserror){
    const container = document.getElementById('container');
    const notification = document.createElement('div');
    notification.style.backgroundColor = iserror ? 'red' : 'green';
    notification.classList.add('notification');
    notification.innerHTML = `<h4>${message}<h4>`;
    container.appendChild(notification);
    setTimeout(()=>{
        notification.remove();
    },2500);
}