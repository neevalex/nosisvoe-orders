$(document).ready(function () {


    $(".add-more").click(function () {
        var html = $(".copy").html();
        $(".after-add-more").after(html);
    });


    $("body").on("click", ".remove", function () {
        $(this).parents(".control-group").remove();
    });

    function dropError(err) {
        $('.err').text(err);
        $('.err').show();
    }


    $(".add .submit").on("click", function (event) {
        event.preventDefault();
        let err = 0;
        if ($(this).hasClass('added')) { return;}
        data = $('form').serializeArray();
        data.forEach((item) => {
            if (item.value.length < 3) {
                dropError('Пожалуйста заполните все поля!');
                err = 1;
            }
        })

        if (!err) {
            $('.err').hide();

            $.ajax({
                    method: "get",
                    url: "/add/",
                    data
                })
                .done(function (msg) {
                    $('.submit').text('Заказ успешно добавлен!'); 
                    $('.submit').addClass('added');
                });
        }
    });





    if ( $( "body.orders" ).length ) {
 
        console.log('orders');

        $.ajax({
            method: "get",
            url: "/get/"
        })
        .done(function (html) {
           // console.log(html);
            i = 0;
            html.forEach((order) => {
                i++;
                console.log(order.name);

                let date_ob = new Date(order.date);
                let date = date_ob.getDate();
                let month = date_ob.getMonth() + 1;
                let year = date_ob.getFullYear();
                
                // prints date & time in YYYY-MM-DD format
                formattedTime = year + "-" + month + "-" + date;
                let products = '';
                order.product.forEach((prd) => {
                    products += '<p>'+prd+'</p>';
                })

                var base = '<div class="order">' + formattedTime + ' <a class="title" data-toggle="collapse" href="#collapse' + i + '" role="button">' + order.name + '</a> '+order.phone+' '+order.total+'грн.'+' || Город:'+order.city+' THH:'+order.tnn+' || <a href="/order?id='+order.id+'">Ссылка поставщику</a><div class="collapse" id="collapse' + i + '"><div class="card card-body">'+products+'</div></div></div> ';
                $(".container .orders").after(base);
            })
        });
     
    }


});