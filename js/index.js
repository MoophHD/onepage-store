function getPriceString(n) {
  return n.toFixed(2).toString() + " руб";
}

$(document).ready(() => {
  renderBestsellers(data.newGoods);
  handleCarousel();
});
