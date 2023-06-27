let currentDate = new Date();

let text_animation = ['Web', 'Mobile', 'Desktop', 'FullStack', 'Designer'];

i = 0;
function animate_text() {
    $('.animated_text span').slideUp(500);
    setTimeout(changeText, 501);
    $('.animated_text span').slideDown();
    i++;
    if (i == text_animation.length) {
        i = 0;
    }
}

function changeText() {
    $('.animated_text span').text(text_animation[i]);
}

setInterval(animate_text, 3000);

function night_mode() {
    $('body').toggleClass('night_mode');
    $('body').toggleClass('day_mode');
}

$('.theme_btn').click(function () {
    night_mode();
    $('.night_mode .theme_btn i').attr('class', 'fa fa-moon');
    $('.day_mode .theme_btn i').attr('class', 'fa fa-sun');
})

let nom = $('#nom').val();
let email = $('#email').val();
let message = $('#message').val();
let tel = $('#tel').val();

$('#nom').change(function () {
    nom = $('#nom').val();
})
$('#tel').change(function () {
    tel = $('#tel').val();
})
$('#email').change(function () {
    email = $('#email').val();
})
$('#message').change(function () {
    message = $('#message').val();
})

$('#envoyer').click(function () {
    $('#envoyer').css('background', 'grey');
    $('#envoyer').text('Sending');
    $.ajax({
        url: 'script/envoyer_mail.php',
        type: 'POST',
        data: {
            nom: nom,
            tel: tel,
            email: email,
            message: message
        },
        success: function () {
            $('.pop_up').slideDown();
            setTimeout(function () {
                $('.pop_up').slideUp();
            },
                3000);

        }
    })
    $('#envoyer').css('background', 'orange');
    $('#envoyer').text('Envoyer');

    return false;
})

$('.partie2 a').click(function () {
    $('.partie2 a').removeClass('active');
    $(this).attr('class', 'active');
})

function setActiveNavElement(e) {
    $('.elNav').removeClass('active');
    $('.elNav').eq(e).addClass('active');
}

// pour fermer la description des projet

$("#projet .titre").click(function (e) {
    if (
        $(this).attr("data-show") == "true"
    ) {
        $(this).parent().children(".contenue").slideUp();
        $(this).attr("data-show", "false")
    }
    else {
        $(this).parent().children(".contenue").slideDown();
        $(this).attr("data-show", "true")
    }
});

function loadWeather() {
    $.ajax({
        type: "GET",
        url: `
            https://api.open-meteo.com/v1/forecast?latitude=12.58&longitude=-7.98&hourly=is_day&daily=temperature_2m_max&current_weather=true&timezone=auto
        `,
        // url: `
        //     ../test/weather.json
        // `,
        dataType: "JSON",
        success: function (response) {

            $("#currentDate").text(`
                ${
                    currentDate.toLocaleDateString(
                        "fr-FR",
                        { weekday: 'long' }
                    )
                }
                ${currentDate.getDate()}
                ${
                    currentDate.toLocaleDateString(
                        "fr-FR",
                        { month: 'long' }
                    )
                }
                ${
                    currentDate.getFullYear()
                }
            `);
            $("#isDay").html(
                `<i 
                    class="fa 
                        ${response.current_weather.is_day
                        ?
                        "fa fa-sun" : "fa-moon"}
                    "
                ></i>`
            );
            let tempsIcone = "fa-thermometer-half";
            switch (response.current_weather.weathercode) {
                case 0 :
                    tempsIcone = "fa-thermometer-half";
                    break;
                default :
                    tempsIcone = "fa-cloud"

            }
            $(".tempsIcone").html(
                `<i class="fa ${tempsIcone}"></i>`
            );

            $("#TempValue").text(response.current_weather.temperature);

            for (let i = 0; i < 7; i++) {
                let date = new Date(response.daily.time[i]);
                let component = `
                    <div>
                        <div class="temperature">${response.daily.temperature_2m_max[i]} C</div>
                        <div>
                            ${(date.getDate() < 10 ? "0" : "") + date.getDate()}/${(date.getMonth() < 10 ? "0" : "") + date.getMonth()}
                        </div>
                    </div>
                `;
                $(".otherMeteo").append(component);
            }
        }
    });
}

loadWeather();