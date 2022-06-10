$("h1").css("color", "red");
$('h1').addClass('big-font')
$("button").text("Button");
$("button").html("<em>Button</em>");
console.log($("img").attr("src"));
$('a').attr('href', 'https://www.google.com');

$('h1').click(() => {
    $('h1').css('color', 'purple');
});

$('button').click(() => {
    $('h1').css('color', 'cyan');
});

$(document).keydown((e) => {
    $('h1').text(e.key);
})

$('h1').on('mouseover', () => {
    $('h1').css('color','blue');
});



