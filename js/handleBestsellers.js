function attachCarouselBestsellers() {
  const newGoods = data.newGoods;
  const owl = $(".owl-carousel");

  owl.owlCarousel({
    items: Object.keys(newGoods).length,
    loop: true,
    center: false,
    nav: true,
    margin: 10,
    pagination: true,
  });

  $(".nav-next").click(() => {
    owl.trigger("next.owl.carousel");
  });

  $(".nav-prev").click(() => {
    owl.trigger("prev.owl.carousel");
  });
}

// by default the 1st item is selected
const getItemHtmlBestsellers = (id, imgSrc, title, desc, variants) => {
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

const bindVariantChange = () => {
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

    priceContainer.text(getPriceString(price));
    priceContainer.removeClass("item-price-discount");

    if (discounted) {
      $(this).addClass("item-variant-discount");
      priceContainer.addClass("item-price-discount");
      priceContainer.after().css(`content: ${originalPrice} руб`);
    }
  });
}

const renderBestsellers = (goods) => {
  const container = $(".bestsellers-carousel");

  Object.entries(goods).forEach( ([id, data]) => {
    container.append(getItemHtmlBestsellers(id, data.img, data.title, data.desc, data.variants));
  });
}

function handleBestsellers(goods) {
  renderBestsellers(goods);
  attachCarouselBestsellers();
  bindVariantChange();
}
