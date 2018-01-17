var first_card_clicked = null;
            var second_card_clicked = null;
            var total_possible_matches = 9;
            var matches = 0;
            var attempts = 0;
            var accuracy = 0;
            var games_played = 0;
            var allow_card_click = true;
            var imagesArr = [
                'images/andy.jpg',
                'images/dwight.jpg',
                'images/gabe.jpg',
                'images/jim.jpg',
                'images/kevin.jpg',
                'images/michael.jpg',
                'images/pam.jpg',
                'images/stanley.jpg',
                'images/toby.jpg',
                'images/andy.jpg',
                'images/dwight.jpg',
                'images/gabe.jpg',
                'images/jim.jpg',
                'images/kevin.jpg',
                'images/michael.jpg',
                'images/pam.jpg',
                'images/stanley.jpg',
                'images/toby.jpg'
            ];

            $(document).ready(initializeApplication);

            function initializeApplication(){
                $(".reset").click(reset_game);
                assembleCards();
                $(".card").click(card_clicked);
            }
            function card_clicked(){
                if(!allow_card_click){
                    return;
                }

                if($(this).hasClass('reveal')){
                    console.log('this card has already been clicked');
                    return;
                }

                $(this).addClass('reveal');

                if(first_card_clicked === null){
                    first_card_clicked = this;
                    return;
                } else {
                    second_card_clicked = this;
                    attempts++;
                    display_stats();
                    allow_card_click = false;

                    if($(first_card_clicked).find('.front img').attr('src') === $(second_card_clicked).find('.front img').attr('src')){
                        matches++;
                        accuracy = Math.floor((matches / attempts) * 100) + '%';
                        display_stats();

                        setTimeout(pause_after_matched, 1000);
                        function pause_after_matched(){
                            $(first_card_clicked).css('visibility', 'hidden');
                            $(second_card_clicked).css('visibility', 'hidden');
                            first_card_clicked = null;
                            second_card_clicked = null;
                            allow_card_click = true;
                        }

                        if(matches === total_possible_matches){
                            show_victory_modal();
                        } else {
                            return;
                        }

                    } else {
                        allow_card_click = false;
                        var timeOut = setTimeout(function () {
                            $(first_card_clicked).removeClass('reveal');
                            first_card_clicked = null;
                            $(second_card_clicked).removeClass('reveal');
                            second_card_clicked = null;
                            allow_card_click = true;
                        }, 2000);
                        return timeOut;
                    }
                }
            }

            function assembleCards(){
                randomizeImagesArray(imagesArr);
                for (var i = 0; i < imagesArr.length; i++){
                    var make_card = $("<div>").addClass('card');
                        var make_front_card = $("<div>").addClass('front');
                        var make_front_img = $("<img>").attr('src', imagesArr[i]);
                            $(make_front_card).append(make_front_img);
                        var make_back_card = $("<div>").addClass('back');
                        var make_back_img = $("<img>").attr('src', 'images/dunderMifflin.png', 'alt', 'dunder mifflin');
                            $(make_back_card).append(make_back_img);
                        $(make_card).append(make_front_card, make_back_card);
                    $(".game-area").append(make_card);
                }
            }

            function randomizeImagesArray(array){
                for (var i = array.length - 1; i > 0; i--){
                    var j = Math.floor(Math.random() * (i + 1));
                    var hold = array[i];
                    array[i] = array[j];
                    array[j] = hold;
                }
                return array;
            }

            function display_stats(){
                $(".games-played .value").empty();
                $(".games-played .value").append(games_played);
                $(".attempts .value").empty();
                $(".attempts .value").append(attempts);
                $(".accuracy .value").empty();
                $(".accuracy .value").append(accuracy);
            }

            function reset_game(){
                games_played++;
                $(".card").remove();
                $(document).ready(assembleCards);
                $(".card").click(card_clicked);
                reset_stats();
                display_stats();
                var audio = $("#office_theme");
                $(".stats_container").append(audio);
            }

            function reset_stats(){
                accuracy = 0;
                matches = 0;
                attempts = 0;
            }

            function show_victory_modal(){
                $("audio").detach();
                var counter = 0;
                var backgroundInterval = setInterval(function(){
                    $(".victory_nailed_it").toggleClass("victory_background_toggle");
                    counter++;
                    if (counter >= 100){
                        clearInterval(backgroundInterval);
                    }
                }, 200);
                var add_iframe = $("<iframe>").attr('src', 'https://www.youtube.com/embed/5P2HNS-wi1Q?autoplay=1');
                $("#modal_body").append(add_iframe);
                $(".victory_modal").css('visibility', 'visible');
                $('.victory_modal').on('shown.bs.modal', function () {
                    $('#everybody_dance')[0].play();
                });
                $('.victory_modal').on('hidden.bs.modal', function () {
                    $('#everybody_dance')[0].pause();
                });
                $(".close").on('click',function() {
                    $(".victory_modal").remove();
                    reset_game();
                    var new_p_stats = $("<p>");
                    $(".stats_container").append(new_p_stats);
                    var audio = $("<audio controls autoplay loop>");
                    var source = $("<source>").attr('src', 'audio/office.mp3', 'type', 'audio/mpeg');
                    $(audio).append(source);
                    $(new_p_stats).append(audio);
                });
            }
