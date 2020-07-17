// selected & discount variant
/*
<button
  class="item-variant item-variant-selected item-variant-discount item"
>
1.2кг
</button>
*/

// by default the 1st item is selected
const getItemHtml = (id, imgSrc, title, desc, variants) => {
  return `<div data-id="${id}" class="bestsellers-item item">
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
              data-discount="${variant.discount || false}" 
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

const handleVariantChange = () => {
  $(".item-variant").click(function () {
    const container = $(this).parent();
    const itemContainer = container.parent();
    const priceContainer = itemContainer.find(".item-price");
    const price = $(this).data().price;
    const discounted = $(this).data().discount;
    const originalPrice = $(this).data().originalPrice;

    container
      .children(".item-variant-selected")
      .removeClass("item-variant-selected");
    $(this).addClass("item-variant-selected");

    console.log(priceContainer)
    priceContainer.text(getPriceString(price));
    priceContainer.removeClass("item-price-discount");

    if (discounted) {
      $(this).addClass("item-variant-discount");
      priceContainer.addClass("item-price-discount");
      priceContainer.after().css(`content: ${originalPrice} руб`);
    }
  });
}



function renderBestsellers(goods) {
  const container = $(".bestsellers-carousel");
  Object.entries(goods).forEach( ([id, data]) => {
    container.append(getItemHtml(id, data.img, data.title, data.desc, data.variants));
  });
  handleVariantChange();
}
