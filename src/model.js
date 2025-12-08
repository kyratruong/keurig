import * as $ from "jquery";
import Swal from "sweetalert2";

var products = [];
var cart = [];

function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  //   console.log(hashTag + ' ' + pageID);

  if (pageID != "") {
    $.get(`/pages/${pageID}.html`, function (data) {
      console.log("data " + data);
      $("#app").html(data);
      if (pageID == "cart") {
        loadCartItems();
      }
    });
  } else {
    if (products.length <= 0) {
      loadProducts();
    } else {
      loadHomePage();
    }
  }
}

function loadCartItems() {
  // Always wire the empty cart button
  $(".empty-cart")
    .off("click")
    .on("click", function () {
      cart = [];
      $(".cart-items").html("Your cart is empty!");
      $(".item-text").html("");
      Swal.fire("Cart is empty!");
    });

  if (cart.length > 0) {
    $(".cart-items").html("");
    console.log("cart page", cart);
    $.each(cart, (index, productIndex) => {
      let product = products[productIndex];
      console.log(product);
      console.log("cart page");
      let cartHTML = `<div class="product">
              <div class="image-holder">
                  <img src="${product.productImage}" alt="">
   
              </div>
              <div class="desc">${product.productDescription}</div>
              <div class="price">$${product.productPrice}</div>
              <div class="remove" data-index="${index}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16"><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M166.2-16c-13.3 0-25.3 8.3-30 20.8L120 48 24 48C10.7 48 0 58.7 0 72S10.7 96 24 96l400 0c13.3 0 24-10.7 24-24s-10.7-24-24-24l-96 0-16.2-43.2C307.1-7.7 295.2-16 281.8-16L166.2-16zM32 144l0 304c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-304-48 0 0 304c0 8.8-7.2 16-16 16L96 464c-8.8 0-16-7.2-16-16l0-304-48 0zm160 72c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176zm112 0c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 176c0 13.3 10.7 24 24 24s24-10.7 24-24l0-176z"/></svg>
                Remove
              </div>
              </div>`;

      $(".cart-items").append(cartHTML);
    });

    $(".remove")
      .off("click")
      .on("click", function () {
        let removeIndex = parseInt($(this).attr("data-index"));
        console.log("remove", cart);
        cart.splice(removeIndex, 1);
        console.log("after removed", cart);
        $(".item-text").html(cart.length);
        loadCartItems();
      });
  } else {
    $(".cart-items").html("Your cart is empty!");
    $(".item-text").html("");
  }
}

function loadHomePage() {
  $("#app").html("");
  $.each(products, (index, product) => {
    let productHTML = `<div class="product">
            ${
              product.productBanner
                ? `<div class="pbanner" style="background-color: ${product.productBannerColor};">${product.productBanner}
                
                </div>`
                : ""
            }
            <div class="image-holder">
                
                <img src="${product.productImage}" alt="">
            </div>
            <div class="productName">${product.productName}</div>
            <div class="productPrice">$${product.productPrice}</div>
            <div class="desc">${product.productDescription}</div>
            <div class="buy">
                <div class="buy-now" id="${index}">Buy Now</div>
            </div>
        </div>`;
    $("#app").append(productHTML);
  });

  addBuyNowListener();
}

function addBuyNowListener() {
  $(".buy-now").on("click", function () {
    let index = $(this).attr("id");
    // let product = products[index];
    cart.push(index);
    $(".item-text").html(cart.length);
    console.log("buy now", index);
  });
}

function loadProducts() {
  $.getJSON("/data/data.json", (data) => {
    products = data.PRODUCTS;
    console.log(products);
    loadHomePage();
  });
}

export function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute();
}
