var id;
var selected;
async function captcha() {
    var x = await fetch('https://192.168.31.191/getCaptcha').then(res => res.json());
    console.log(x.one)
    document.getElementById('img1').src
    = x.one;
    document.getElementById('img2').src
    = x.two;
    document.getElementById('img3').src
    = x.three;
    document.getElementById('img4').src
    = x.four;
    document.getElementById('img5').src
    = x.five;
    document.getElementById('img6').src
    = x.six;
    id = x.captchaid
}



async function select(no) {
    document.getElementById("btn1").style.background='#393839';
    document.getElementById("btn2").style.background='#393839';
    document.getElementById("btn3").style.background='#393839';
    document.getElementById("btn4").style.background='#393839';
    document.getElementById("btn5").style.background='#393839';
    document.getElementById("btn6").style.background='#393839';
    document.getElementById("btn" + no).style.background='#92f054';
    selected = no;
        

}


