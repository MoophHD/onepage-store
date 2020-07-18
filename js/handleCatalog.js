const getItemHtmlCatalog = (id, imgSrc, desc, price) => {
  return `<div 
            data-quantity="1"
            class="catalog-product">
            <img
                class="product-img"
                src="${imgSrc}"
                alt="product ${id}"
            />
            <p class="product-desc">
                ${desc}
            </p>
            <span class="product-price">${getPriceString(price)}</span>

            <div class="product-selectbar">
              <div class="selectbar-quantity">
                <span class="quantity-title">Количество</span>
                <div class="quantity-btn-container">
                  <button class="quantity-btn quantity-btn-remove">−</button>
                  <span class="quantity-count">1</span>
                  <button class="quantity-btn quantity-btn-add">+</button>
                </div>
              </div>
              <button class="selectbar-add item-add">В корзину</button>
            </div>
        </div>`;
};

const bindCatalogSelect = () => {
  $(".catalog-product").hover(
    function () {
      $(this).addClass("catalog-product--selected");
    },
    function () {
      $(this).removeClass("catalog-product--selected");
    }
  );
};

const bindQuantityCounter = () => {
  $(".quantity-btn").click(function () {
    const product = $(this).parents(".catalog-product");
    let quantity = parseInt(product.data().quantity);
    const priceContainer = $(this).siblings(".quantity-count");

    if ($(this).hasClass("quantity-btn-add")) {
      quantity++;
    } else {
      quantity--
    }
    product.data('quantity', quantity)
    priceContainer.text("" + quantity);
  });
};

function handleCatalog(goods) {
  const container = $(".catalog-products");
  Object.entries(goods).forEach(([id, data]) => {
    container.append(getItemHtmlCatalog(id, data.img, data.desc, data.price));
  });
  bindCatalogSelect();
  bindQuantityCounter();
}
