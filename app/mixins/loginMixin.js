define(['mixin', 'jquery'], function (mixin, $) {

    return mixin({
        async: true
    }, function (deferred, u,p, n) {

        $.ajax({
            dataType: "json",
            url:'http://localhost:8080/token',
            async: false,
            type: 'GET',
            headers: {"Authorization": "Basic " + window.btoa(p + ":" + n)},
            success: function(data, textStatus, jqXHR) {
                console.log('SUCCESS');
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
            },
            error : function(jqXHR, textStatus, errorThrown){
                console.log('ERROR!');
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            }

        })


    });
});
