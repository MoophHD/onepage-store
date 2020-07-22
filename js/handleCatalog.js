function handleCatalog(goods) {
  const catalog = $(".catalog-products");
  const rowCount = getCatalogRowCount();

  initialRender(catalog, goods, rowCount);
  handleCatalogLoad(catalog, goods, rowCount);
}

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
              <button class="selectbar-add item-add">В корзину</button>
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