var oldScroll= window.pageYOffset;
window.onscroll=function(){
    var currentScroll=window.pageYOffset;
    if(oldScroll>currentScroll){
        $('.navbar1').slideDown();
        $('.theme_main_zone').slideUp();
    }
    else{
        $('.navbar1').slideUp();
        $('.theme_main_zone').slideDown();
    }
    oldScroll=currentScroll;
}