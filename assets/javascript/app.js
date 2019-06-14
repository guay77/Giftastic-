$(document).ready(function() {

    var subject = ['Breaking Bad', 'Sopranos', 'Game of Thrones', 'The Wire', 'Californication'];


    function renderButtons() {

        $('#subjectSearch').empty();


        for (var i = 0; i < subject.length; i++) {



            var a = $('<button type="button">')
            a.addClass('subjectButton');
            a.addClass('btn btn-primary');
            a.attr('data-name', subject[i]);
            a.text(subject[i]);
            $('#subjectSearch').append(a);
        }
    }




    $('#addSubject').on('click', function() {

        console.log('button clicked');



        var subject = $('#subjectInput').val().trim();

        console.log(subject);
        if (subject != "") {

            subject.push(subject);

            renderButtons();
        } else {
            $('#subjectInput').attr("placeholder", "Please enter a subject to search.")
            renderButtons();
        }




        return false;
    });


    //Function for displaying gifs and still images
    function displaysubjectGif() {

        $('#viewGif').empty();
        var subject = $(this).attr('data-name');
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + subject + "&api_key=dc6zaTOxFJmzC&limit=10&offset=0";


        $.ajax({ url: queryURL, method: 'GET' })
            .done(function(response) {


                var subjectDiv = $('<div class="subjectImage">');
                console.log(response);
                for (i = 0; i < response.data.length; i++) {
                    var stillImage = response.data[i].images.fixed_height_still.url;
                    console.log(stillImage);

                    var playImage = response.data[i].images.fixed_height.url;
                    console.log("Moving" + playImage);

                    var rating = response.data[i].rating;
                    console.log(rating);


                    var pOne = $('<p>').text("Rating: " + rating.toUpperCase());
                    subjectDiv.append(pOne);

                    var image = $("<img>").attr("src", stillImage);
                    image.attr("playsrc", playImage);

                    subjectDiv.append(image);

                    $('#gifView').append(subjectDiv);

                    image.addClass('playClickedGif');

                }
            });
    }

    function swapGif() {

        var playImage = $(this).attr('playsrc');

        console.log(playImage);



        var stopImage = $(this).attr('stopsrc');

        console.log(stopImage);


        if ($(this).attr('playsrc') == $(this).attr('src')) {

            $(this).attr('src', stopImage);
        } else {
            $(this).attr('src', playImage);
        }
    }







    renderButtons();


    $(document).on('click', '.subjectButton', displaysubjectGif);
    $(document).on('click', '.playClickedGif', swapGif);


});