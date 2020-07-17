function getPriceString(n) {
  return n.toFixed(2).toString() + " руб";
}

$(document).ready(() => {
  handleBestsellers(data.newGoods);
  handleCatalog(data.goods);
});
