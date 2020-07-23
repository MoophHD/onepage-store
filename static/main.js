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
      desc: "Диетические консервы Hill's m/d Diabetes, 250гр",
      price: 13.37
    },
    g1: {
      img: "img/product2.png",
      desc: "Консервы Royal Canin Kitten Instinctive, 400гр",
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
    g9: {
      img: "img/zapivam.jpg",
      desc: "Пивокот пивокот",
      price: 9
    },
    g10: {
      img: "img/kotkorobka.jpg",
      desc: "Кот для коробки",
      price: 10
    },
    g11: {
      img: "img/zapivam.jpg",
      desc: "Пивокот пивокот",
      price: 11
    },
    g12: {
      img: "img/kotkorobka.jpg",
      desc: "Кот для коробки",
      price: 12
    },
    g13: {
      img: "img/zapivam.jpg",
      desc: "Пивокот пивокот",
      price: 13
    },
    g14: {
      img: "img/kotkorobka.jpg",
      desc: "Кот для коробки",
      price: 14
    },

  }
};

function attachCarouselBestsellers() {
  const newGoods = data.newGoods;
  const owl = $(".owl-carousel");

  owl.owlCarousel({
    items: Object.keys(newGoods).length,
    loop: true,
    center: false,
    nav: false,
    pagination: false,
    margin: 0,
    responsive:{
      0:{
          items:1,
          nav: false,
          pagination: false,
      },
      650:{
          items:2,
          nav: false,
          pagination: false,
      },
      1000:{
          items:3,
          nav: false,
          pagination: false,
      }
  }
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

function handleCatalog(goods) {
  const catalog = $(".catalog-products");
  const rowCount = getCatalogRowCount();

  initialRender(catalog, goods, rowCount);
  handleCatalogLoad(catalog, goods, rowCount);

  handleCollapseSelectbar();
  bindSelectBarAdd();
}

const bindSelectBarAdd = () => {
  $(window).resize(handleCollapseSelectbar);
};

const handleCollapseSelectbar = () => {
  console.log(`!`);
  if (window.screen.width < 1000) {
    $(".selectbar-add").addClass("selectbar-add-collapsed");
  } else {
    $(".selectbar-add").removeClass("selectbar-add-collapsed");
  }
};

const getCatalogRowCount = () => {
  const catalog = $(".catalog-products");
  let count = 0;
  catalog.append(getItemHtmlCatalog(0, "", "", 0));
  count = countRowElements(".catalog-products", ".catalog-product");
  catalog.children(".catalog-product")[0].remove();

  return count;
};

const initialRender = (catalog, goods, rowCount) => {
  catalog.append(`<div class="catalog-load">
    <div class="load-cross"></div>
  </div>`);

  renderItems(catalog, goods, rowCount * 2 - 1);
};

const handleCatalogLoad = (catalog, goods, rowCount) => {
  $(".catalog-load").click(function () {
    const currentCount = catalog.children(".catalog-product").length;
    const dataCount = Object.keys(goods).length;
    const nextCount = Math.min(rowCount, dataCount - currentCount);
    renderItems(catalog, goods, nextCount);

    if (currentCount + nextCount >= dataCount) {
      $(this).remove();
    }
  });
};

const renderItems = (container, goods, count) => {
  const rendered = container.children(".catalog-product").length;
  Object.entries(goods)
    .slice(rendered, rendered + count)
    .forEach(([id, data]) => {
      const nextProduct = $(
        getItemHtmlCatalog(id, data.img, data.desc, data.price)
      );
      nextProduct.insertBefore($(".catalog-load"));
      bindCatalogSelect(nextProduct);
      bindQuantityCounter(nextProduct);
    });
};

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
              <button class="selectbar-add item-add">
                <span>В корзину</span>
                <i  class="fas fa-shopping-cart shop-icon"></i>
              </button>
            </div>
        </div>`;
};

const bindCatalogSelect = (product) => {
  $(".catalog-product").hover(
    function () {
      $(this).addClass("catalog-product--selected");
    },
    function () {
      $(this).removeClass("catalog-product--selected");
    }
  );
};

const bindQuantityCounter = (product) => {
  $(product.find(".quantity-btn")).click(function () {
    let quantity = parseInt(product.data().quantity);
    const priceContainer = $(this).siblings(".quantity-count");

    if ($(this).hasClass("quantity-btn-add")) {
      quantity++;
    } else {
      quantity--;
    }

    quantity = Math.max(quantity, 1);
    product.data("quantity", quantity);
    priceContainer.text("" + quantity);
  });
};

const countRowElements = (gridSelector, itemSelector) => {
  let itemWidth = $(itemSelector).outerWidth(true);
  let gridWidth = $(gridSelector).width();
  let gridGap = +$(gridSelector).css("row-gap").split("px").join("");
  const potentialRowCount = parseInt(
    (gridWidth + gridGap) / (itemWidth + gridGap)
  );
  return potentialRowCount;
};

function getPriceString(n) {
  return n.toFixed(2).toString() + " руб";
}

$(document).ready(() => {
  handleBestsellers(data.newGoods);
  handleCatalog(data.goods);
});
