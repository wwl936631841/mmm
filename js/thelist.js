$(function(){

    var brandtitleid = getQueryString("brandtitleid");
    var brandname = getQueryString("brandname");
    $("#main .title").html(brandname+" 产品销量排行");
    $("#main .pinglun").html(brandname+"最有用的用户评论");

    $.ajax({
        url: "http://mmb.ittun.com/api/getbrandproductlist",
        data: {
            brandtitleid: brandtitleid,
            pagesize: 4,
        },
        success: function(backdata){
            // console.log(backdata);
            var data = backdata; 
            var html = template("list",backdata);
            $(".list ul").html(html);
            var productId = backdata.result[0].productId;

            $.ajax({
                url: "http://mmb.ittun.com/api/getproductcom",
                data: {
                    productid : productId,
                },
                success: function(backdata){
                    console.log(backdata);
                    var html = template("pinglun",backdata);                 
                    $(".ping-list ul").html(html);
                    var htmlone = template("one-photo",data);
                    $(".ping-list ul li .ping-top").html(htmlone);
                                     
                                    
                }
            })
            
            
        }
    })

   
     

})

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}