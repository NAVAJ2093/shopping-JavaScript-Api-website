// fetch data
const productContainer = document.getElementById("productContainer");

const createProductCard = (product) => {
  const truncatedTitle =
    product.title.length > 20
      ? product.title.substring(0, 20) + "..."
      : product.title;

  return `
      <div class="products-card">
        <div class="image"><img src="${product.image}" /></div>
        <div class="description">${product.category}</div>
        <h1 class="title">${truncatedTitle}</h1>
        <div class="box">
          <div class="pric">$${product.price}</div>
          <button class="product-btn">Buy Now</button>
        </div>
      </div>
    `;
};

const fetchProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const products = await response.json();
    products.forEach((product) => {
      const productCardHTML = createProductCard(product);
      productContainer.insertAdjacentHTML("beforeend", productCardHTML);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

fetchProducts();

// add to cart functionality

document.addEventListener("DOMContentLoaded", function () {
  const cartIcon = document.getElementById("cart-icon");
  const cart = document.querySelector(".cart");
  const closeButton = document.getElementById("cart-close");
  const cartContent = document.querySelector(".cart-content");
  const totalElement = document.querySelector(".total-price");
  let num = 0;
  let total = 0;

  cart.style.display = "none";

  const toggleCart = () => {
    console.log("Toggle cart");
    cart.classList.toggle("active");
    cartIcon.classList.toggle("active");

    cart.classList.add("smooth-transition");
    setTimeout(() => {
      cart.classList.remove("smooth-transition");
    }, 300);
  };

  const closeCart = () => {
    console.log("Close cart");
    cart.classList.remove("active");
    cartIcon.classList.remove("active");

    cart.classList.add("smooth-transition");
    setTimeout(() => {
      cart.classList.remove("smooth-transition");
    }, 300);
  };

  if (cartIcon) {
    console.log("Cart icon found");
    cartIcon.addEventListener("click", toggleCart);
  } else {
    console.log("Cart icon not found");
  }

  if (closeButton) {
    console.log("Close button found");
    closeButton.addEventListener("click", closeCart);
  } else {
    console.log("Close button not found");
  }

  cart.style.display = "block";

  const handleAddToCart = (title, price, imgSrc) => {
    num++;
    document.querySelector("#cart-Num").textContent = num;

    total += parseFloat(price.replace("$", ""));
    totalElement.textContent = `$${total.toFixed(2)}`;

    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <div class="cart-item-details">
        <img src="${imgSrc}" class="cart-item-img">
        <div class="cart-item-info">
          <div class="cart-item-title">${title}</div>
          <div class="cart-item-price">${price}</div>
          <div class="cart-item-quantity">1</div>
        </div>
      </div>
      <i class="fa-solid fa-xmark cart-item-remove"></i>
    `;

    cartItem
      .querySelector(".cart-item-remove")
      .addEventListener("click", () => {
        cartContent.removeChild(cartItem);
        num--;
        document.querySelector("#cart-Num").textContent = num;
        total -= parseFloat(price.replace("$", ""));
        totalElement.textContent = `$${total.toFixed(2)}`;
        if (num === 0) {
          cart.style.display = "block";
        }
      });

    cartContent.appendChild(cartItem);
  };

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("product-btn")) {
      const title = event.target
        .closest(".products-card")
        .querySelector(".title").textContent;
      const price = event.target
        .closest(".products-card")
        .querySelector(".pric").textContent;
      const imgSrc = event.target
        .closest(".products-card")
        .querySelector(".image img").src;
      handleAddToCart(title, price, imgSrc);
    }
  });
});

// Testimonial functionality

let userTexts = document.getElementsByClassName("user-text");
let userPics = document.getElementsByClassName("user-pic");

function showReview() {
  for (userPic of userPics) {
    userPic.classList.remove("active-pic");
  }
  for (userText of userTexts) {
    userText.classList.remove("active-text");
  }
  let i = Array.from(userPics).indexOf(event.target);
  userPics[i].classList.add("active-pic");
  userTexts[i].classList.add("active-text");
}

document.querySelector(".burger-menu").addEventListener("click", function () {
  document
    .querySelectorAll(".burger-icon,.close-icon")
    .forEach((icon) => icon.classList.toggle("active"));

  document.querySelector("nav ul").classList.toggle("active");
  document.querySelector(".icon").classList.toggle("active");
});

// scroll navlinks
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth" });
      }

      navLinks.forEach((link) => {
        link.classList.remove("active");
        link.style.cssText = "";
      });

      this.classList.add("active");
      this.style.color = "#7bc9ff";
    });
  });
});
