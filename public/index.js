/**
 * Created by rfiedor on 2/8/16.
 */

console.log('say what')
///////////////////////////////////

var sanityCheck = function(){

    var currentSanityCheck;

    $('#sanity-check').on('change', function(e){
        currentSanityCheck = $('#sanity-check').val();
        dbAccess.storeSanityCheck();
    })
    return {
        currentSanityCheck : function(){ return currentSanityCheck}
    }
}()

var dbAccess = function(){

    var storeSanityCheck = function(){

        $.ajax({
            type: "POST",
            url: '/sanitychecks',
            data: {'sanityCheck':sanityCheck.currentSanityCheck()},
            success: function(){
                console.log('succ')
            }
        });

    }

    return {
        storeSanityCheck : storeSanityCheck
    }

}()

var populateCanaryResults = function(){

    $.ajax({
        type: "GET",
        url: '/canary',
        success: function(data){


            _.each(data, function(item){

                console.log(item)

                item = JSON.parse(item.sanityCheckResult)

                var div = $('<div>'+ new Date(item.date) +'</div>');

                var sanityChecks=item.sanityChecks;

                console.log('it!',sanityChecks)

                _.each(sanityChecks, function(sCheck){
                    div.append('   '+sCheck.item+'   ')
                    div.append(sCheck.found === true ? sCheck.found : 'false')
                })


                console.log('sanityChecks',sanityChecks)


                $('#canary-results').append(div);
                //$('#canary-results').append(tpl({foo: sanityChecks.item}));

            })




            //console.log('canary results',JSON.parse(data[0].sanityCheckResult));

        }
    });
}

populateCanaryResults();

var populateCurrenltSavedSanityChecks = function(){

    $.ajax({
        type: "GET",
        url: '/sanitychecks',
        success: function(data){

            var sanityChecks = data[0].sanityCheck.split('@@@')
            _.each(sanityChecks, function(sanityCheckItem){

                var $sanityCHeck = ("<div>"+sanityCheckItem+"</div>")


                $('#previously-saved-sanity-check').append($sanityCHeck)

            //
            //    console.log('sanityCheckItem',sanityCheckItem)
            //    //console.log(sanityCheckItem)
            //
            //    //var $item = $('<div>yo<div/>')
            //
            //    //console.log('sanityCheckItem',sanityCheckItem)
            //
            //
            ////_.each(sanityCheckItem, function(it){
            ////
            ////    var tpl = _.template("<h1>Some text: "+ it +"</h1>");
            ////  $item.append(tpl(123))
            ////
            ////
            //})
            //
            //
            //
            })

        }
    });
}

populateCurrenltSavedSanityChecks()


