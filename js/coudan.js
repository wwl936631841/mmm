$(function () {
    var coudan = new Coudan();
    coudan.showSearch();
    coudan.getStore();
    coudan.getArea();
    coudan.getProducts(shopId, areaId);
    coudan.setStore();
    // coudan.goProductMsg();
})

var shopId = 0,
    areaId = 0;
var Coudan = function () {

}

Coudan.prototype = {
    // 搜索菜单
    showSearch: function () {
        $(".search").on("click", function () {
            $(".search-box").toggleClass("hide");
            $(this).toggleClass("fa-bars").toggleClass("fa-times");
        });
        $(".rank .item").click(function () {
            $(".rank .item").removeClass("active");
            $(this).addClass("active");
        });
        $(".category span").click(function () {
            $(".category span").removeClass("active");
            $(this).addClass("active");
        })
    },
    // 获取店铺
    getStore: function () {
        $.ajax({
            url: "http://mmb.ittun.com/api/getgsshop",
            success: function (data) {
                var storeHtml = template("storeTmp", data);
                $(".stores").html(storeHtml);
            }
        })
    },
    // 获取地区
    getArea: function () {
        $.ajax({
            url: "http://mmb.ittun.com/api/getgsshoparea",
            success: function (data) {
                var areaHtml = template("areaTmp", data);
                $(".areas").html(areaHtml);
            }
        })
    },
    // 获取商品
    getProducts: function (shopId, areaId) {
        $.ajax({
            url: "http://mmb.ittun.com/api/getgsproduct",
            beforeSend: function () {
                $("#load").show();
            },
            data: {
                shopid: shopId,
                areaid: areaId
            },
            success: function (data) {
                $("#load").hide();
                var product = template("productTmp", data);
                $(".products").html(product);
            }
        })
    },
    // 设置分类搜索
    setStore: function () {

        var that = this;
        $(".stores").on("click", ".store-item", function () {
            var name = $(this).text();
            $("#store>span").text(name);
            var shopId = $(this).data("id");
            $(".store-item").removeClass("active");
            $(this).addClass("active");
            that.getProducts(shopId, areaId);
        });
        $(".areas").on("click", ".area-item", function () {
            var name = $(this).text();
            $("#area>span").text(name.slice(0, 2));
            var areaId = $(this).data("id");
            $(".area-item").removeClass("active");
            $(this).addClass("active");
            that.getProducts(shopId, areaId);
        });
    },
    // 商品详情跳转
    goProductMsg: function () {
        $(".products").on("click", ".product-item", function () {

        });
    }

}