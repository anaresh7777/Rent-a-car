/**
 * Created by Naresh Goud on 5/6/2016.
 */


$('.active').hover(function() {
    $(this).slideToggle(400)
});
/*var active = $('.active');
$('.active').hide();
active.find('a').on('click', function(e) {
    e.preventDefault();
    active.find('.current').removeClass('current');
    $(this).addClass('current');
    $(this.hash).show().siblings().hide();
}).first().click();*/

/*$('ul.nav-sidebar li.active').hover(function() {

    $('.dropdown', this).fadeIn();
}, function() {
    $('.dropdown', this).fadeOut('fast');
});
}); 
$('.sidebar ul li').hover(function() {
$(this).slideToggle(400)
}); */
