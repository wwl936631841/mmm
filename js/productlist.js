var mmm, categoryid, pageid = 1,
    pagesize, totalCount, num, i;
$(function () {
    mmm = new Mmm();
    mmm.getproductlist(pageid);
    mmm.getPage();
});
Mmm = function () {

};
Mmm.prototype = {
    getproductlist: function (pageid) {
        categoryid = JSON.parse(localStorage.getItem('ID'));
        $.ajax({
            url: 'http://mmb.ittun.com/api/getproductlist',
            data: {
                categoryid: categoryid[0].categoryId,
                pageid: pageid,
            },
            success: function (data) {
                console.log(data);
                var html = template('productListTmp', data);
                $('.media-list').html(html);
                $('.breadcrumb .active a').html(categoryid[0].category);
                $('.breadcrumb .active a').attr('data-category', categoryid[0].categoryId);
                $('.breadcrumb .active a').on('click', function () {
                    window.location.href = 'poductlist.html';
                });
            }
        });
    },
    getPage: function () {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getproductlist',
            data: {
                categoryid: categoryid[0].categoryId,
            },
            success: function (data) {
                pagesize = data.pagesize;
                totalCount = data.totalCount;
                num = Math.ceil(totalCount / pagesize);
                for (i = 0; i < num; i++) {
                    $('#selectPage').append('<option value="' + (i + 1) + '">' + (i + 1) + '/' + num + '</option>');
                }
                $('#selectPage').change(function () {
                    pageid = $('#selectPage').val();
                    mmm.getproductlist(pageid);
                });
            }
        });
        $('#prev').on('click', function (e) {
            e.preventDefault();
            pageid = +$('#selectPage').val();
            if (pageid == 1) {
                return;
            } else {
                $('#selectPage').val(pageid - 1);
                pageid = pageid - 1;
                mmm.getproductlist(pageid);
            }
        });
        $('#next').on('click', function (e) {
            e.preventDefault();
            pageid = +$('#selectPage').val();
            if (pageid == num) {
                return;
            } else {
                $('#selectPage').val(pageid + 1);
                pageid = pageid + 1;
                mmm.getproductlist(pageid);
            }
        });
    }
};