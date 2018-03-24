$(function() {
    getNav();
    getProductList();
})

function getNav() {
    $.ajax({
        url: 'http://mmb.ittun.com/api/getindexmenu',
        success: function(data) {
            var html = template('navTmp', data);
            $('#nav .row').html(html);
        }
    })
}

function getProductList() {
    $.ajax({
        url: 'http://mmb.ittun.com/api/getmoneyctrl',
        success: function(data) {
            var html = template('productlistTmp', data);
            $('#productlist').html(html);
        }
    })
}
