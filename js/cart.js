document.getElementById("loader").style.display = "none";

var products = [
    {
        productImage: "images/products/product.jpg",
        productName: "Modern Programming",
        productPrice: 15.00
    },
    {
        productImage: "images/products/product-2.png",
        productName: "ASP.NET Core",
        productPrice: 15.50
    },
    {
        productImage: "images/products/product-3.jpg",
        productName: "Python",
        productPrice: 14.00
    },
    {
        productImage: "images/products/product-4.jpg",
        productName: "Java Script",
        productPrice: 14.90
    },
    {
        productImage: "images/products/product-5.jpg",
        productName: "Web Developing",
        productPrice: 13.00
    },
    {
        productImage: "images/products/product-6.jpg",
        productName: "SQL",
        productPrice: 13.50
    },
    {
        productImage: "images/products/product-7.jpg",
        productName: "Data Science",
        productPrice: 13.50
    },
    {
        productImage: "images/products/product-8.jpg",
        productName: "Machine Learning",
        productPrice: 14.00
    },
    {
        productImage: "images/products/product-9.jpg",
        productName: "C++ for beginners",
        productPrice: 19.90
    },
    {
        productImage: "images/products/product-10.jpg",
        productName: "Internet of Things",
        productPrice: 17.50
    }
]


var cart = document.querySelector('cart-items-container');

if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}
else{
    ready();
}

function ready(){

    for(var i = 0; i < products.length; i++){
        var items = document.createElement('div');
        items.innerHTML = `
        <div class="box">    
            <div class="content">
                <div class="image">
                    <img class="product-img" src=${products[i].productImage} alt="">
                </div>
                <h3 class="product-title">${products[i].productName}</h3>
                  
                <div class="price">
                    $<label class="priceLabel">${products[i].productPrice.toFixed(2)}</label>
                    <span>
                        <input type="number" class="quantity" value="1"  min="1">  
                    </span>
                </div>

                <a href="#" class="btn-addCart" style="width:100%;">add to cart</a>

             </div>
        </div>`
        
        document.getElementById('box-container').append(items)

    }

    var addBtns = document.getElementsByClassName('btn-addCart');
    for(var i = 0; i < addBtns.length; i++){
        var btnAdd = addBtns[i];
        btnAdd.addEventListener('click', addItem)
    }

    var removeBtns = document.getElementsByClassName('fas fa-times');
    for(var i = 0; i < removeBtns.length; i++){
        var btn = removeBtns[i];
        btn.addEventListener('click', removeItem)
    }

}

function addItem(event){
    var btnClicked = event.target;
    var shopProduct = btnClicked.parentElement;

    var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
    let price = shopProduct.getElementsByClassName('priceLabel')[0].innerText;
    var img = shopProduct.getElementsByClassName("product-img")[0].src;
    let quantity = shopProduct.getElementsByClassName("quantity")[0].value;

    addToCart(title, price, img, quantity);
}

let total = 0;
let cartProducts = [];

function addToCart(title, price, img, quantity){

    var item ={
        title : title,
        price : price,
        img : img,
        quantity : quantity
    };
    cartProducts.push(item);

    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-item');
    var cartItems = document.getElementsByClassName('items')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-title');

    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames[i].innerText == title){
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'You have already added this item to the cart!',
                showConfirmButton: false,
                timer: 1500
              })
            return;
        }       
    }

    let itemTotal = parseFloat(price) * parseFloat(quantity);
    total = total + itemTotal;

    var cartBoxContent = `
                      <span class="fas fa-times" id="remove"></span>
                      <img src=${img} alt="">
                      <div class="content">
                        <h3 class="cart-title">${title}</h3>
                        <div class="cart-price">$${price} <span>x ${quantity}</span> = <span class="itemTotal" style="padding-left:10px;font-weight:bold">${itemTotal.toFixed(2)}</span></div>
                      </div>

                      `
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Item added successfully!',
        showConfirmButton: false,
        timer: 1500
      })

    cartShopBox.getElementsByClassName('fas fa-times')[0].addEventListener('click', removeItem);

    for(var i = 0; i < cartItemsNames.length; i++){
        if(cartItemsNames.length > 0){

            document.getElementById('checkout').innerHTML = ` <button onclick="checkoutBtnClick()" class="btn-checkout" id="checkout">Checkout Now</button>`;
            document.getElementById('input-form').innerHTML = `<form action="" class="form">
                                                                    <div class="main-items">
                                                                        <input type="text" name="name" id="name" class="input-default" placeholder="Name">
                                                                        <div id="name-error-massege" class="error-massge-box"></div>
                                                                    </div>

                                                                    <div class="main-items">
                                                                        <input type="text" name="contact" id="contact" class="input-default" placeholder="Email">
                                                                        <div id="email-error-massege" class="error-massge-box"></div>
                                                                    </div>
                                                                </form> `;
                                                                //pass the total
            document.getElementById('total').innerHTML = `<h1 class="total">Total: <span class="total-price">$${total.toFixed(2)}</span></h1>`;

        }
        
    }

}

//when click the checkout button

function checkoutBtnClick(){
    if(inputValidation() == true){

        const custName = document.getElementById("name").value;
        localStorage.setItem("customerName",custName);
        const custEmail = document.getElementById("contact").value;
        localStorage.setItem("customerEmail",custEmail);
        localStorage.setItem('CartProducts',JSON.stringify(cartProducts));
        localStorage.setItem('OrderTotal',JSON.stringify(total));
        document.getElementById("loader").style.removeProperty("display");
        document.getElementById("cart-items-container").style.display = 'none';
        
        setTimeout(function(){
            window.location.assign("check-out.html");
        },2000);
    }
}

function removeItem(event){
    var btnClicked = event.target;
    btnClicked.parentElement.remove();

    var removePrice = btnClicked.parentElement.getElementsByClassName('itemTotal')[0].innerText;
    total = total - removePrice;
    document.getElementById('total').innerHTML = `<h1 class="total">Total: <span class="total-price">$${total.toFixed(2)}</span></h1>`;

    var cartItems = document.getElementsByClassName('items')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-title');
    if(cartItemsNames.length == 0){
        document.getElementById('checkout').innerHTML = `<h1 style="margin: 300px 50px 75px 85px; color: rgb(255, 106, 0);"><i>No items in cart!</i></h1>`;
        document.getElementById('total').innerHTML = ``;
        document.getElementById('input-form').innerHTML = ``;
    }    

}

//validation of the name and email feilds 

function inputValidation(){
    var name = document.getElementById("name").value;
    var contact = document.getElementById("contact").value;
    var emailRegEx = /^[a-z0-9.]+@[a-z]+\.[a-z]{2,3}$/;

    if (name === ""){
        document.getElementById("name-error-massege").innerHTML = "Please enter your name!";
        document.getElementById("name").style.border = "2px solid red";
        return false;
    }
    else{
        document.getElementById("name-error-massege").innerHTML = " ";
        document.getElementById("name").style.border = "2px solid green";

        if(!emailRegEx.test(contact)){
            document.getElementById("email-error-massege").innerHTML = "Please enter a valid email address!";
            document.getElementById("contact").style.border = "2px solid red";
            return false;
        }
        else{
            document.getElementById("email-error-massege").innerHTML = "";
            document.getElementById("contact").style.border = "2px solid green";
            return true
        }
    }
}
