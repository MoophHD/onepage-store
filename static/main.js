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

  goods: {
    g0: {
      img: "img/product1.png",
      desc: "Диетические консервы Hill's m/d Diabetes /Weight, 250гр",
      price: 13.37
    },
    g1: {
      img: "img/product2.png",
      desc: "Консервы Royal Canin Kitten Instinctive",
      price: 13.37
    },
    g2: {
      img: "img/mem.jpg",
      desc: "Коты котята кошки, как я устал",
      price: 13.37
    },
    g3: {
      img: "img/hughughug.jpg",
      desc: "Ну что, еще по одной",
      price: 13.37
    },
    g4: {
      img: "img/krisa.jpg",
      desc: "Бяк, бяк, бяк",
      price: 13.37
    },
    g5: {
      img: "img/asu.jpg",
      desc: "Асу-асу-асу",
      price: 13.37
    },
    g6: {
      img: "img/catgarage.jpg",
      desc: "Продам катаж",
      price: 13.37
    },
    g7: {
      img: "img/zapivam.jpg",
      desc: "Пивокот пивокот",
      price: 13.37
    },
    g8: {
      img: "img/kotkorobka.jpg",
      desc: "Кот для коробки",
      price: 13.37
    },

  }
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
  renderCatalog(data.goods);
});

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
    container.append(getItemHtmlBestsellers(id, data.img, data.title, data.desc, data.variants));
  });
  handleVariantChange();
}

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
