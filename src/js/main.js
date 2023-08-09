let items = [
    {
        id: "0",
        name: "Hoodies",
        stock: 5,
        price: 14,
        urlImage: "src/img/img/featured1.png"
    },
    {
        id: "1",
        name: "Hoodies Rocky",
        stock: 7,
        price: 14,
        urlImage: "src/img/img/featured3.png"
    },
    {
        id: "2",
        name: "Swatshirts",
        stock: 10,
        price: 24,
        urlImage: "src/img/img/featured2.png"
    },
    
]

// click del carrito para abrirlo y ocultarlo
{
    const iconCart = document.querySelector('.bx-shopping-bag');
    const modeLight = document.querySelector('.bx-moon');
    const iconX = document.querySelector('.bx-x');
    const contentCart = document.querySelector(".contentCart");
    const bodyContainer = document.querySelector(".container");
    const menuStore = document.querySelector(".menu-home-store");
    const menuNavbar = document.querySelector(".navbar__menu-option");
    const homeDetails = document.querySelector(".home__details-item");
    const footer = document.querySelector('.footer');
    const footerSocial = document.querySelector('.footer__information-social');


    iconX.addEventListener('click', () => {
        contentCart.classList.toggle("contentCart__show")
    })

    iconCart.addEventListener('click',function(){
        contentCart.classList.toggle("contentCart__show")
    })

    modeLight.addEventListener('click',function(){
        bodyContainer.classList.toggle("color__background")
    })
    modeLight.addEventListener('click',function(){
        bodyContainer.classList.toggle("color__fonts")
    })
    modeLight.addEventListener('click',function(){
        menuStore.classList.toggle("color__fonts-navbar")
    })
    modeLight.addEventListener('click',function(){
        menuNavbar.classList.toggle("color__fontsA")
    })
    modeLight.addEventListener('click',function(){
        homeDetails.classList.toggle("color__fonts")
    })
    modeLight.addEventListener('click',function(){
        footer.classList.toggle("color__fontsS")
    })
    modeLight.addEventListener('click',function(){
        footerSocial.classList.toggle("color__fontsI")
    })
    
}

const products = document.querySelector('.product__details');
const cartProduct = document.querySelector('.cartProduct');
const cartTotal = document.querySelector('.cartTotal');
const cartAmount =document.querySelector('.cartAmount');

items = JSON.parse(localStorage.getItem("items")) || items;
let objCart = JSON.parse(localStorage.getItem("objCart")) || {};

function searchProduct(id){
    return items.find(function(item){
        return item.id === id;
    });
}

function deleteProduct(id){
    const res = confirm("Are you sure to delete this product?")
            if (res) delete objCart[id];
}

function verifyAddToCart(findProduct, id){
    if(findProduct.stock === objCart[id].amount) {
        alert("Sorry, this product is not available in stock");
    } else {
        objCart[id].amount++;
    }
}

function printCartAmount() {
    let sum = 0;

    const arrayCart = Object.values(objCart);

    if(!arrayCart.length) {
        cartAmount.style.display = "none";
        return;
    };

    cartAmount.style.display = "inline-block";

    arrayCart.forEach(function ({ amount }){
        sum += amount;
    });

    cartAmount.textContent = sum;
}

function printTotalCart() {
    const arrayCart = Object.values(objCart);
    //cuando no tienes nada en el carrito
    if(!arrayCart.length) {
        cartTotal.innerHTML = `
        <section class="cartProductempty flex">
            <img src="./src/img/img/empty-cart.png" alt="Empty">
        </section>
        <h3>Your cart is empty</h3>
        `;

        return;
    }

    let sum = 0;

    arrayCart.forEach(function ({ amount, price }) {
        sum += amount * price;
    });



    cartTotal.innerHTML = `
        <h3>Total to pay <i class='bx bxs-badge-dollar'></i> ${sum}.00</h3>
        <br/>
        <button class="btn btn__buy">Buy</button>

    `
}

function printProductsInCart() {
    let html = '';

    const arrayCart = Object.values(objCart);

    arrayCart.forEach(function({id, name, price, urlImage, amount}){
        html += `
            <section class="product">    
                <section class="product__img">
                    <img src="${urlImage}" alt"${name}" />
                </section>

                <section class="product__info">
                    <p>${name}</p>
                    <p><i class='bx bxs-badge-dollar'></i>${price}.00</p>
                    <p>amount: ${amount}</p>
                </section>

                <section class="product_options" id="${id}">
                    <i class='bx bx-minus'></i>
                    <i class='bx bx-plus'></i>
                    <i class='bx bx-trash' ></i>
                </section>
            </section>
        `
    });
    //for

    cartProduct.innerHTML = html;
}

function printProducts(){
    let html = '';

    items.forEach(function({id, name, stock, price, urlImage}){
        const typeButton = stock 
            ? '<button class="btn btn__add">ADD TO CART</button>' 
            : '<button class="btn btn__su">STOCK UNAVAILABLE</button>'
        html += `
        <section class="product__details-img filter-${id}">
        <img src="${urlImage}" alt"${name}">
        <section class="product__details-img-details">
            <section class="product__details-img-details-title flex">
                <h3 class="product__details-price"><i class='bx bxs-badge-dollar'></i>${price}.00</h3>
                <p class="categories-details"><small> | Stock: ${stock} </small></p>
            </section>
            <section class="paragraph">
                <h3 class="product__details-price-name">${name}</h3>
            </section>
        </section>
        <section class="product_options" id="${id}">
            ${typeButton}
        </section>
    </section>
    `
    });

    products.innerHTML = html;
}

products.addEventListener('click', function(e){
    if(e.target.classList.contains('btn__add')){
        //obtenemos el id
        const id = e.target.parentElement.id;

        //obtenemos el producto por id
        let findProduct = searchProduct(id)

        if(findProduct.stock === 0) return alert("Item sold out")

        //logica para el carrito
        if(objCart[id]){
            verifyAddToCart(findProduct, id)
        }else{
            objCart[id] = {
                ...findProduct,
                amount: 1
            }
        }

        localStorage.setItem("objCart", JSON.stringify(objCart));
    }
    
    

    printProductsInCart();
    printTotalCart()
    printCartAmount()
})

cartProduct.addEventListener('click', function (e) {

    if (e.target.classList.contains("bx-minus")) {
        const id = e.target.parentElement.id;
        
        if (objCart[id].amount === 1) {
            deleteProduct(id)
        } else {
            objCart[id].amount--;
        }
    }

    if (e.target.classList.contains("bx-plus")) {
        const id = e.target.parentElement.id;
        let findProduct = searchProduct(id)
        verifyAddToCart(findProduct, id)
    }

    if (e.target.classList.contains("bx-trash")) {
        const id = e.target.parentElement.id;
        
        deleteProduct(id)
    }

    localStorage.setItem("objCart", JSON.stringify(objCart));

    printProductsInCart();
    printTotalCart()
    printCartAmount()
})

cartTotal.addEventListener('click', function(e) {
    if(e.target.classList.contains("btn__buy")) {
        const res = confirm("Confirm the purchase")

        if (!res) return;
        
        let newArray = [];

        items.forEach(function(item) {
            if (item.id === objCart[item.id]?.id) {
                newArray.push({
                    ...item,
                    stock: item.stock - objCart[item.id].amount,
                });
            } else {
                newArray.push(item);
            }
        });

        items = newArray;
        objCart = {};

        localStorage.setItem("objCart", JSON.stringify(objCart));
        localStorage.setItem("items", JSON.stringify(items));

        printProducts();
        printProductsInCart()
        printTotalCart();
        printCartAmount()
    }
});


printProducts();
printTotalCart();
printCartAmount();
printProductsInCart();

// filtrado de products:

mixitup(".product__details", {
    selectors: {
        target: '.product__details-img'
    },
    animation: {
        duration: 300
    }
});

