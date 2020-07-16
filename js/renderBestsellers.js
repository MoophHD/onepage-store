// selected & discount variant
/*
<button
  class="item-variant item-variant-selected item-variant-discount item"
>
1.2кг
</button>
*/

// by default the 1st item is selected
const getItemHtml = (imgSrc, title, desc, variants) => {
  return `<div class="bestsellers-item item">
      <img class="item-img" src="${imgSrc}" />
      <h2 class="item-title">
          ${title}
      </h2>
      <p class="item-desc">
          ${desc}
      </p>
      <div class="item-variants">
        ${variants
          .map(
            (variant, ind) =>
              `<button 
              data-price="${variant.price}" 
              class="item-variant item ${
                variant.discount ? "item-variant-discount" : ""
              } ${
                ind == 0 ? "item-variant-selected" : ""
              }
              "
              ${
                variant.discount
                  ? `data-origprice=${variant.originalPrice}`
                  : ""
              }
            >
            ${variant.text}
          </button>`
          )
          .join("")}
      </div>

      <div class="item-commerce">
          <span class="item-price ${
            variants[0].discount ? "item-price-discount" : ""
          }"
              >${getPriceString(variants[0].price)}</span
          >
          <button class="item-add">В корзину</button>
      </div>
  </div>`;
};

function renderBestsellers(goods) {
  const container = $(".bestsellers-carousel");
  goods.forEach(product => {
    container.append(getItemHtml(product.img, product.title, product.desc, product.variants));
  });
}
