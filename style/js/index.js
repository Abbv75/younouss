

let text_animation=['Web','Mobile', 'Desktop', 'FullStack', 'Designer'];

i=0;
function animate_text(){
    $('.animated_text span').slideUp(500);
    setTimeout(changeText, 501);
    $('.animated_text span').slideDown();
    i++;
    if(i==text_animation.length){
        i=0;
    }
}

function changeText(){
    $('.animated_text span').text(text_animation[i]);
}

setInterval(animate_text, 3000);

function night_mode(){
    $('body').toggleClass('night_mode');
    $('body').toggleClass('day_mode');
}

$('.theme_btn').click(function(){
    night_mode();
    $('.night_mode .theme_btn i').attr('class','fa fa-moon');
    $('.day_mode .theme_btn i').attr('class','fa fa-sun');
})

let nom=$('#nom').val();
let email=$('#email').val();
let message=$('#message').val();
let tel=$('#tel').val();

$('#nom').change(function(){
    nom=$('#nom').val();
})
$('#tel').change(function(){
    tel=$('#tel').val();
})
$('#email').change(function(){
    email=$('#email').val();
})
$('#message').change(function(){
    message=$('#message').val();
})

$('#envoyer').click(function(){
    $('#envoyer').css('background', 'grey');
    $('#envoyer').text('Sending');
    $.ajax({
        url:'script/envoyer_mail.php',
        type:'POST',
        data:{
            nom:nom,
            tel:tel,
            email:email,
            message:message
        },
        success: function(){
            $('.pop_up').slideDown();
            setTimeout(function(){
                $('.pop_up').slideUp();
            },
            3000);

        }
    })
    $('#envoyer').css('background', 'orange');
    $('#envoyer').text('Envoyer');
    
    return false;
})

$('.partie2 a').click(function(){
    $('.partie2 a').removeClass('active');
    $(this).attr('class','active');
})

function setActiveNavElement(e){
    $('.elNav').removeClass('active');
    $('.elNav').eq(e).addClass('active');
}