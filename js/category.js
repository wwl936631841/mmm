var mmm;
$(function () {
    mmm = new Mmm();
    mmm.getCategoryTitle();
    mmm.getCategory();
    mmm.getCategoryById();
});
Mmm = function () {

};
Mmm.prototype = {
    getCategoryTitle: function () {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getcategorytitle',
            success: function (data) {
                console.log(data);
                var html = template('listclassTmp', data);
                // console.log(html);
                $('.panel-group').html(html);
            }
        });
    },
    getCategory: function () {
        $('.panel-group').on('click', '.title', function () {
            var titleid = $(this).data("id");
            if ($(this).children().hasClass('fa-angle-down')) {
                $('.title span').removeClass().addClass("fa fa-angle-down");
                $(this).children().removeClass().addClass("fa fa-angle-up");
                $.ajax({
                    url: 'http://mmb.ittun.com/api/getcategory',
                    data: {
                        titleid: titleid
                    },
                    success: function (data) {
                        console.log(data);
                        var html = template('getcategoryTmp', data);
                        // console.log(html);
                        $('.panel-body ul').html(html);
                        $(this).parent().parent().next().collapse();
                    }
                });
            } else if ($(this).children().hasClass('fa fa-angle-up')) {
                $(this).children().removeClass("fa fa-angle-up").addClass("fa fa-angle-down");
            }
        });
    },
    getCategoryById: function () {
        $('.panel-group').on('click', 'li', function () {
            var categoryid = $(this).data('id');
            var ID = [],
                result = {};
            $.ajax({
                url: 'http://mmb.ittun.com/api/getcategorybyid',
                data: {
                    categoryid: categoryid,
                },
                success: function (data) {
                    console.log(data);
                    result = {
                        categoryId: data.result[0].categoryId,
                        category: data.result[0].category,
                        titleId: data.result[0].titleId,
                    };
                    console.log(result);
                    ID.push(result);
                    console.log(ID);
                    ID = JSON.stringify(ID);
                    console.log(ID);
                    localStorage.setItem("ID", ID);
                    window.location.href = './../poductlist.html';
                }
            });
            // console.log(ID);
        });
    }
};