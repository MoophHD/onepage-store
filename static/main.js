const data = {
  newGoods: {
    ng0: {
      img: "./img/catfood.png",
      title: "Carnilove Salmon & Turkey for Kittens",
      desc: "Беззерновой корм для котят, лосось и индейка. ",
      variants: [
        {
          text: "400гр",
          price: 10,
        },
        {
          text: "800гр",
          price: 15,
        },
        {
          text: "1.5кг",
          price: 18.7,
          discount: true,
          originalPrice: 20,
        },
        {
          text: "1.8кг",
          price: 25,
        },
      ],
    },
    ng1: {
      img: "./img/catlitter.png",
      title: "Наполнитель Elegant Cat (яблоко)",
      desc: "Силикагелевый наполнитель с ароматом яблока.",
      variants: [
        {
          text: "1.8л",
          price: 15,
        },
        {
          text: "2.5л",
          price: 25,
        },
        {
          text: "3.5л",
          price: 30,
        },
      ],
    },
    ng2: {
      img: "./img/catfood2.png",
      title: "Purina Pro Plan Sterilised Rabbit (Кролик)",
      desc: "Корм для стерилизованных котов и кошек",
      variants: [
        {
          text: "400гр",
          price: 30,
        },
        {
          text: "800гр",
          price: 55,
        },
      ],
    },
  },
};

function handleCarousel() {
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

function getPriceString(n) {
  return n.toFixed(2).toString() + " руб";
}

$(document).ready(() => {
  renderBestsellers(data.newGoods);
  handleCarousel();
});

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
