


$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow",function(){
        $(".loader-wrapper").remove();
    });
  });
 



$(function() {

    //【返回顶部】
    $(".slide-top").click(function() {
        $("html,body").animate({ 'scrollTop': 0 }, 500)
    })

    //【网站图标的悬停动画】

    $("#logo-img").hover(
        function() {
            $(this).attr("src", "/favicon/cupLogo-2.png");
        },
        function() {
            $(this).attr("src", "/favicon/cupLogo.png");
        }
    );

    $("#hi").hover(
        function() {
            $(this).attr("src", "/favicon/hi4.png");
        },
        function() {
            $(this).attr("src", "/favicon/hi3.png");
        }
    );


})

// 【导航栏状态切换】
const currentLocation = location.href;
const menuItem = document.querySelectorAll('.nav-text');
const menuLength = menuItem.length;
for (let i = 0;i<menuLength; i++){
    if(menuItem[i].href === currentLocation){
        menuItem[i].classList.add("nowHere");
    }
}