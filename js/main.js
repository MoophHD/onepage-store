function getPriceString(n) {
    return n.toFixed(2).toString();
}

$(document).ready(() => {
    const newGoods = data.newGoods;
    const owl = $(".owl-carousel");

    $(".nav-next").click(() => {
        owl.trigger("next.owl.carousel");
    });

    $(".nav-prev").click(() => {
        owl.trigger("prev.owl.carousel");
    });

    const carousel = $(".bestsellers-carousel");

    owl.owlCarousel({
        items: 3,
        loop: true,
        center: false,
        nav: true,
        margin: 10,
        pagination: true,
    });

    $(".item-variant").click(function () {
        const variantContainer = $(this).parent();
        const variantIndex = variantContainer.children().index($(this));
        const itemContainer = variantContainer.parent();
        const itemIndex = $('.owl-item.active').index(itemContainer.parent());
        const price = itemContainer.find(".item-price");

        variantContainer
            .children(".item-variant-selected")
            .removeClass("item-variant-selected");
        $(this).addClass("item-variant-selected");

        const variantData = newGoods[itemIndex].variants[variantIndex];
       
        price.text(`${getPriceString(variantData.price)} руб`);

        price.removeClass('item-price-discount');

        if (variantData.discount) {
            console.log(price);
            $(this).addClass('item-variant-discount');
            price.addClass('item-price-discount');
            price.after().css(`content: ${variantData.originalPrice} руб`);
        }

    });
});
