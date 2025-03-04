// choosing button and adding border to the selected one
let ringButtons = document.querySelectorAll(".ring-button");

for (let ringButton of ringButtons) {
  ringButton.addEventListener("click", function (event) {
    // checking if the color already exist
    for (let innerRing of ringButtons) {
      innerRing.classList.remove("border-red-400");
      innerRing.classList.add("border-yellow-500");
    }

    // if not then add border
    event.target.classList.add("border-red-400");
    event.target.classList.remove("border-yellow-500");

    // getting color button
    const color = event.target.id.replace("-color", "");

    let productImg = document.getElementById("product-image");
    productImg.src = "../images/" + color + ".png";
  });
}

// getting color in selected Button

// first way
// let squareButtons = document.querySelectorAll('.border-gray-300.rounded-lg.text-sm')

// for(let squareButton of squareButtons){
//   squareButton.addEventListener('click', function(event){

//     for(let squareBut of squareButtons){
//       squareBut.classList.remove('border-red-500')

//     }

//     event.target.classList.add('border-red-500')
//   })

// }

// Second way

function setWristSize(size) {
  const sizes = ["S", "M", "L", "XL"];
  for (i = 0; i < sizes.length; i++) {
    let button = document.getElementById("size-" + sizes[i]);
    let element = sizes[i];
    if (size === element) {
      button.classList.add("border-purple-500");
    } else {
      button.classList.remove("border-purple-500");
    }
  }
}

// Getting quantity button + and -

let quantityElement = document.querySelectorAll(".quantity-button");
for (let btn of quantityElement) {
  btn.addEventListener("click", function (event) {
    const amount = event.target.innerText === "+" ? 1 : -1;

    // console.log(clickCount);

    //

    const quantity = document.getElementById("quantity");

    const currentQuantity = parseInt(quantity.innerText);

    const newQuantity = Math.max(0, currentQuantity + amount);
    quantity.innerText = newQuantity;
  });
}

// add to cart

let cartCount = 0;
let cartItems = [];
document.getElementById("add-to-cart").addEventListener("click", function () {
  let quantity = parseInt(document.getElementById("quantity").innerText);

  if (quantity > 0) {
    document.getElementById("checkout-container").classList.remove("hidden");
    cartCount = cartCount + quantity;
    document.getElementById("cart-count").innerText = cartCount;

    const selectedButton = document.querySelector("button.border-red-400.w-6");
    const selectedColor = selectedButton.id.split("-")[0];
    const selectedSize = document
      .querySelector("button.border-purple-500:not(.w-6)")
      .innerText.split("$")[0];
    const selectedPrice = document
      .querySelector("button.border-purple-500:not(.w-6)")
      .innerText.split("$")[1];

    cartItems.push({
      Image: "../images/" + selectedColor + ".png",
      title: "Modern Smart watch",
      color: selectedColor,
      size: selectedSize,
      quantity: quantity,
      price: quantity * parseInt(selectedPrice),
      total: cartCount,
    });
  } else {
    alert("Please Select quantity");
  }
});

document.getElementById("checkout-btn").addEventListener("click", function () {
  let cartModal = document.getElementById("cart-modal");
  cartModal.classList.remove("hidden");

  let cartContainer = document.getElementById("cart-items");

  let allPRices = 0;

  for (let cartItem of cartItems) {
    const row = document.createElement("tr");
    row.classList.add("border-b");

    row.innerHTML = `

    <td class="py-2 px-4">
      <div class="flex items-center space-x-8">
        <img class="h-12 w-12 " src="${cartItem.Image}" alt="">
        <span class="font-semibold">${cartItem.title}</span>
      </div>
    </td>

    <td class="py-2 px-4">${cartItem.color}</td>
    <td class="py-2 px-4">${cartItem.size}</td>
    <td class="py-2 px-4">${cartItem.quantity}</td>
    <td class="py-2 px-4">$${cartItem.price}</td>`;

    cartContainer.appendChild(row);

    // price
    let totalPrice = cartItem.price;
    allPRices = allPRices + totalPrice;

    document.getElementById('quantity-id').innerText = cartItem.total
    document.getElementById('toatl-id').innerText = "$"+allPRices
    


  }
});
document
  .getElementById("continue-shopping")
  .addEventListener("click", function () {
    document.getElementById("cart-modal").classList.add("hidden");
  });
