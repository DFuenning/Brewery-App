// $(window).on('load', function () {
//     $('.modal').modal('show')
// })


// $(document).ready(function () {



            var key = "JCSwBfoESyxmXiCPDgTBHPPDkUWm9rDw";

            $.ajax({
                url: "http://www.mapquestapi.com/traffic/v2/markets?key=" + key,
                method: 'GET',


            }).then(function (url) {


                console.log(url)
            });