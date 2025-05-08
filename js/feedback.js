function validateForm(){
    const nameRegEx=/^[a-zA-Z ]{3,}$/;
    const emailRegEx=/^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/;

    let name = document.forms["form-feedback"]["name"].value;
    let email=document.forms["form-feedback"]["email"].value;
    let profession=document.forms["form-feedback"]["profession"].value;
    let reaction=document.forms["form-feedback"]["reaction-face"].value;
    let comment=document.forms["form-feedback"]["comment-box"].value;
    let visitAgain=document.forms["form-feedback"]["visit"].value;

    //name
    let name_box=document.getElementsByClassName("inputBox")[0];
    let name_error = document.getElementById("name-error-massege");
    if (!nameRegEx.test(name)){
        name_box.style.border="1px solid red";
        name_error.innerText="Name is required!";
    }else {
        name_box.style.border="1px solid rgba(255,255,255,.3)";
        name_error.innerText="";
        //email
        let email_box=document.getElementsByClassName("inputBox")[1];
        let email_error = document.getElementById("email-error-massege");

        if(email === ""){
            email_box.style.border="1px solid red";
            email_error.innerText="Email is required!";
        }
        else if (!emailRegEx.test(email)){
            email_box.style.border="1px solid red";
            email_error.innerText="Invalid Email!";
        }
        else {
            email_box.style.border="1px solid rgba(255,255,255,.3)";
            email_error.innerText="";
            // profession
            let profession_dropDown=document.getElementById("profession");
            let profession_error = document.getElementById("profession-error-massege");
            if (profession===""){
                profession_dropDown.style.border="1px solid red";
                profession_error.innerText="Profession is required";
            }else {
                profession_dropDown.style.border="1px solid rgba(255,255,255,.3)";
                profession_error.innerText="";
                // reaction
                let reaction_error=document.getElementById("reaction-error-massege")
                if (reaction===""){
                    reaction_error.innerText="This field is required";
                }else {
                    reaction_error.innerText="";
                    //comment
                    let comment_area=document.getElementById("comment-box");
                    let comment_error = document.getElementById("service-comment-error-massege");
                    if (comment===""){
                        comment_area.style.border="1px solid red";
                        comment_error.innerText="Your comment is required";
                    }else {
                        comment_area.style.border="1px solid rgba(255,255,255,.3)";
                        comment_error.innerText="";
                        //visitAgain
                        let visit_error = document.getElementById("visit-error-massege");
                        if (visitAgain===""){
                            visit_error.innerText="This field is required";
                        }else {
                            visit_error.innerText="";
                            return true;
                        }

                    }

                }
            }
        }

    }
    return false;
}

// validate and submit the form
let form = document.getElementsByName("form-feedback").item(0);
form.addEventListener('submit',(event)=>{
    if (validateForm()){
        console.log("form valid");
        document.getElementById("contact").style.display="none"
        document.getElementById("after-submit").style.display="block"
    }else {
        event.preventDefault();
        console.log("form invalid")
    }

})