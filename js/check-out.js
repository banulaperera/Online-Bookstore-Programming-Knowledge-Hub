var inputName = document.getElementById("name");
var cName = localStorage.getItem("customerName");
inputName.value = cName;

var inputEmail = document.getElementById("email-address");
var email = localStorage.getItem("customerEmail");
inputEmail.value = email;


const cartProducts =  JSON.parse(localStorage.getItem("CartProducts"));
var totalPrice= JSON.parse(localStorage.getItem('OrderTotal'));

document.getElementById("subtotal").innerHTML = totalPrice.toFixed(2);

document.getElementById("total").innerHTML = (totalPrice + 0.10).toFixed(2);

document.getElementById("payAmount").innerHTML = (totalPrice + 0.10).toFixed(2);

var items = "";

for(var i = 0; i < cartProducts.length; i++){
  
  items += `
  <div class="product-section">
    
    <div class="products">

      <div class="image-box">
        <img src=${cartProducts[i].img} alt="Cabbage" width="80px" class="product-image">
      </div>

      <div class="detail">

        <h4 class="name-of-the-product">${cartProducts[i].title}</h4>

        <div class="wrapper">

          <div class="product-qty">
            <span id="quantity"><span class="quan">Qauntity </span> ${cartProducts[i].quantity}</span>
          </div>

          <div class="price">
            $ <span id="price">${cartProducts[i].price}</span>
          </div>

        </div>

      </div>

     

    </div>

  </div>`
  
  document.getElementById('ordered-products').innerHTML = items;
}

function billingToggle(){
    const element = document.getElementById("payment-form"); 

    if(element.style.display) {
        element.style.removeProperty("display");
    } 
    else{
        element.style.display = "none";
    }
    
}


function contactToggle(){
    const element = document.getElementById("contact-form"); 

    if(element.style.display) {
        document.getElementById("contact-form").style.removeProperty("display");
    } 
    else{
        document.getElementById("contact-form").style.display = "none";
    }
    
}

  function cardDetails(){
      var cardholderName = document.getElementById("cardholder-name").value;
      var cardNumber = document.getElementById("card-number").value;
      var expirationDate = document.getElementById("expire-date").value;
      var expirationMonth = document.getElementById("expire-month").value;
      var cvv = document.getElementById("cvv").value;

      const nameRegEx = /^((?:[A-Za-z]+ ?){1,3})$/;
      const cardNumberRegEx = /^4[0-9]{12}(?:[0-9]{3})?$/;
      const cvvRegEx = /^[0-9]{3,4}$/;

      if(!nameRegEx.test(cardholderName)){
        document.getElementById("name-error-massege").innerHTML = "Name is required!";
        document.getElementById("cardholder-name").style.border = "2px solid red";
        return false;
      }
      else{
        document.getElementById("cardholder-name").style.border = "2px solid green";
        document.getElementById("name-error-massege").innerHTML = "";

        //card number validation
        if(!cardNumberRegEx.test(cardNumber)){
          document.getElementById("card-error-massege").innerHTML = "Please enter a valid card number!";
          document.getElementById("card-number").style.border = "2px solid red";
          return false;
        }
        else{
          document.getElementById("card-error-massege").innerHTML = "";
          document.getElementById("card-number").style.border = "2px solid green";

          //Expire Date validation
          //Date validation
          if(expirationDate === ""){
            document.getElementById("date-error-massege").innerHTML = "Please enter a valid date!";
            document.getElementById("expire-date").style.border = "2px solid red";
            return false;
          }
          else if(expirationDate > 31){
            document.getElementById("date-error-massege").innerHTML = "Please enter a valid date!";
            document.getElementById("expire-date").style.border = "2px solid red";
            return false;
          }
          else if(expirationDate < 1){
            document.getElementById("date-error-massege").innerHTML = "Please enter a valid date!";
            document.getElementById("expire-date").style.border = "2px solid red";
            return false;
          }
          else{
            document.getElementById("date-error-massege").innerHTML = "";
            document.getElementById("expire-date").style.border = "2px solid green";

            //Expire Date Validation
            //Month validation
            if(expirationMonth === ""){
              document.getElementById("date-error-massege").innerHTML = "Please enter a valid month!";
              document.getElementById("expire-month").style.border = "2px solid red";
              return false;
            }
            else if(expirationMonth < 1){
              document.getElementById("date-error-massege").innerHTML = "Please enter a valid month!";
              document.getElementById("expire-month").style.border = "2px solid red";
              return false;
            }
            else if(expirationDate > 12){
              document.getElementById("date-error-massege").innerHTML = "Please enter a valid month!";
              document.getElementById("expire-month").style.border = "2px solid red";
              return false;
            }
            else{
              document.getElementById("date-error-massege").innerHTML = "";
              document.getElementById("expire-month").style.border = "2px solid green";

              //cvv validation
              if(!cvvRegEx.test(cvv)){
                document.getElementById("cvv-error-massege").innerHTML = "Please enter a valid CVV!";
                document.getElementById("cvv").style.border = "2px solid red";
                return false;
              }
              else{
                document.getElementById("cvv-error-massege").innerHTML = "";
                document.getElementById("cvv").style.border = "2px solid green";
                return true;
               
              }
            }
          }
        }
      }
    }

    function payBtnClick(){
      if(cardDetails() == true && billingAddressValidation() == true && contactDetailValidation() == true){
        Swal.fire(
          'You have placed the order successfully!',
          ' ',
          'success'
        ).then((result) => {
            
          if (result.isConfirmed) {
              window.location.href = "buy-products.html";
          } 
        })
      }
    }

    function paymentDetailsSaveBtn(){
      
      if(cardDetails() == true){

        Swal.fire({
        title: 'Do you want to save the changes?',
        showCancelButton: true,
        confirmButtonText: 'Save',

      }).then((result) => {

          if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success');
            document.getElementById("payment-form").style.display = "none";
          } 
        })
      }
    }

    function billingAddressValidation(){
      var adressOne = document.getElementById("adress-one").value;
      var townCity = document.getElementById("town-city").value;
      var stateRegion = document.getElementById("state-region").value;
      var country = document.getElementById("country").value;
      var postalCode = document.getElementById("postal-code").value;

      if(adressOne === ""){
        document.getElementById("payment-form").style.removeProperty("display");
        document.getElementById("address-error-massege").innerHTML = "Please enter the address!";
        document.getElementById("adress-one").style.border = "2px solid red";
        return false;
      } 
      else{
        document.getElementById("address-error-massege").innerHTML = "";
        document.getElementById("adress-one").style.border = "2px solid green";

        //town/city
        if(townCity === ""){
          document.getElementById("payment-form").style.removeProperty("display");
          document.getElementById("town-error-massege").innerHTML = "Please enter the town or city!";
          document.getElementById("town-city").style.border = "2px solid red";
          return false;
        }
        else{
          document.getElementById("town-error-massege").innerHTML = "";
          document.getElementById("town-city").style.border = "2px solid green";

          //state/region
          if(stateRegion === ""){
            document.getElementById("payment-form").style.removeProperty("display");
            document.getElementById("state-error-massege").innerHTML = "Please enter the state or region!";
            document.getElementById("state-region").style.border = "2px solid red";
            return false;
          }
          else{
            document.getElementById("state-error-massege").innerHTML = "";
            document.getElementById("state-region").style.border = "2px solid green";

            //country
            if(country === "select country"){
              document.getElementById("payment-form").style.removeProperty("display");
              document.getElementById("country-error-massege").innerHTML = "Please enter the country!";
              document.getElementById("country").style.border = "2px solid red";
              return false;
            }
            else{
              document.getElementById("country-error-massege").innerHTML = "";
              document.getElementById("country").style.border = "2px solid green";

              //postal code
              if(postalCode === ""){
                document.getElementById("payment-form").style.removeProperty("display");
                document.getElementById("postal-error-massege").innerHTML = "Please enter the country!";
                document.getElementById("postal-code").style.border = "2px solid red";
                return false;
              }
              else{
                document.getElementById("postal-error-massege").innerHTML = "";
                document.getElementById("postal-code").style.border = "2px solid green";
                return true;
              }
            }
          }
        }
      }
    }

    function billingAddressSaveBtn(){
      
      if(billingAddressValidation() == true){

        Swal.fire({
        title: 'Do you want to save the changes?',
        showCancelButton: true,
        confirmButtonText: 'Save',

      }).then((result) => {

          if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success');
            document.getElementById("payment-form").style.display = "none";
          } 
        })
      }
    }

    function contactDetailValidation(){

      var mobileNumber = document.getElementById("phone-number").value;
      var email = document.getElementById("email-address").value;

      var emailRegEx = /^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/;
      var mobileRegEx = /^([+]\d{2}[ ])?\d{10}$/;

      if(!mobileRegEx.test(mobileNumber)){
        document.getElementById("contact-form").style.removeProperty("display");
        document.getElementById("mobile-error-massege").innerHTML = "Please enter the phone number!";
        document.getElementById("phone-number").style.border = "2px solid red";
        return false;
      }
      else{
        document.getElementById("mobile-error-massege").innerHTML = "";
        document.getElementById("phone-number").style.border = "2px solid green";

        //email validation
        if(!emailRegEx.test(email)){
          document.getElementById("contact-form").style.removeProperty("display");
          document.getElementById("email-error-massege").innerHTML = "Please enter the valid email address!";
          document.getElementById("email-address").style.border = "2px solid red";
          return false;
        }
        else{
          document.getElementById("email-error-massege").innerHTML = "";
          document.getElementById("email-address").style.border = "2px solid green";
          return true;
        }
      }
    }

    function contactDetailSaveBtn(){
      
      if(contactDetailValidation() == true){

        Swal.fire({
        title: 'Do you want to save the changes?',
        showCancelButton: true,
        confirmButtonText: 'Save',

      }).then((result) => {

          if (result.isConfirmed) {
            Swal.fire('Saved!', '', 'success');
            document.getElementById("contact-form").style.display = "none";
          } 
        })
      }
    }
