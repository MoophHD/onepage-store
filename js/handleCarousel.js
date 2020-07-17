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
