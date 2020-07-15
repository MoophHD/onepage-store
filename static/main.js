function handleCarousel() {
  function getPriceString(n) {
    return n.toFixed(2).toString();
  }

  const newGoods = data.newGoods;
  const owl = $(".owl-carousel");

  owl.owlCarousel({
    items: 3,
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

  $(".item-variant").click(function () {
    console.log(`item variant click`);
    const variantContainer = $(this).parent();
    const variantIndex = variantContainer.children().index($(this));
    const itemContainer = variantContainer.parent();
    const itemIndex = $(".owl-item.active").index(itemContainer.parent());
    const price = itemContainer.find(".item-price");

    variantContainer
      .children(".item-variant-selected")
      .removeClass("item-variant-selected");
    $(this).addClass("item-variant-selected");

    const variantData = newGoods[itemIndex].variants[variantIndex];

    console.log(`item index ${itemIndex}`);
    console.log(`variant index ${variantIndex}`);

    price.text(`${getPriceString(variantData.price)} руб`);

    price.removeClass("item-price-discount");

    if (variantData.discount) {
      $(this).addClass("item-variant-discount");
      price.addClass("item-price-discount");
      price.after().css(`content: ${variantData.originalPrice} руб`);
    }
  });
}

const data = {
  newGoods: [
    {
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
    {
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
    {
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
  ],
};

$(document).ready(() => {
  //carousel.js
  handleCarousel();
});
