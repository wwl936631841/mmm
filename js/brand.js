var brand;
$(function(){
    brand = new Brand();
    brand.getBrand();
    brand.clicktolist();

})

var Brand = function(){

}
Brand.prototype = {

    // 获取所有十大品牌
    getBrand: function(){
        $.ajax({
            url: "http://mmb.ittun.com/api/getbrandtitle",
            success: function(backdata){
                console.log(backdata);
                var html= template("brand", backdata);
                $("#accordion2").html(html);
                brand.clickgetBrand();
                

                
            }
            
        })
    },

    // 点击分类获取对应的十大品牌
    clickgetBrand: function(){
        $("#accordion2").on("click",".b-content",function(){
            var brandTitleId = $(this).data("id");
            var tes = $(this).parents().find("ul");
            // console.log(brandTitleId);
            $.ajax({
                url: "http://mmb.ittun.com/api/getbrand",
                data: {
                    brandtitleid: brandTitleId,
                },
                success: function(backdata){
                    // console.log(backdata);
                    var html = template("brand-show",backdata)
                    // console.log(html);           
                    tes.html(html);
                    
                }
            })
            
        })
    },

    // 点击查看详情跳转对应品牌页面

    clicktolist: function(){

        $("#accordion2").on("click",".more",function(){

            var brandtitleid = $(this).data("id");
            var brandname = $(this).data("name");
            brandname = brandname.substring(0,brandname.length-4);         
            window.location.href = "thelist.html?brandtitleid="+brandtitleid+"&brandname="+brandname;
            
        })

    }


}