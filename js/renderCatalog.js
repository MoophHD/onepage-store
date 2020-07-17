const getItemHtmlCatalog = (id, imgSrc, desc, price) => {
  return `<div class="catalog-product">
            <img
                class="product-img"
                src="${imgSrc}"
                alt="product ${id}"
            />
            <p class="product-desc">
                ${desc}
            </p>
            <span class="product-price">${getPriceString(price)}</span>
        </div>`;
};

function renderCatalog(goods) {
  container = $(".catalog-products");
  Object.entries(goods).forEach(([id, data]) => {
    container.append(getItemHtmlCatalog(id, data.img, data.desc, data.price));
  });
}
