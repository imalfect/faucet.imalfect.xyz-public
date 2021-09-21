function claim() {
          
    (async () => {
      // hcaptcha check

     document.getElementById("claimbtn").innerHTML
     = '<div class="subtextblack">Please wait...</div>';
     document.getElementById("claimbtn").disabled = false;
   var address = document.getElementById("address").value;
   var test = window.bananocoinBananojs.getBananoAccountValidationInfo(address).valid;
   console.log("one two" + test);
   if (test === true || test === "true" || test === 'true') {


     var address = document.getElementById("address").value;
    console.log(window.bananocoinBananojs.getBananoAccountValidationInfo(address));
    (async () => {
     document.getElementById("claimbtn").disabled = true;
     var request  = await fetch('https://192.168.31.191/redeem?addr=' + address + '&' + 'ip=' + "djdjj" + "&key=" + id + "&answer=" + selected).then(response => response.json())
     var code = request.code;
     var poolname = request.poolname;
     console.log(code);


     if (code === "69") {
     console.log('Malcious IP detected');
     document.getElementById("claimbtn").disabled = false;
     document.getElementById("claimbtn").innerHTML
     = '<div class="subtextblack">Your IP is considered as malcious, are you using a VPN?</div>';
     captcha()
     getBal()


   } else if (code === "420") {
     console.log("New IP claiming")
     document.getElementById("claimbtn").disabled = false;
     document.getElementById("claimbtn").innerHTML
     = '<div class="subtextblack">Claimed!</div>';
     document.getElementById('sponsor').style.visibility = 'visible';
     document.getElementById('sponsor').innerHTML
     = `<a id="lime" href="https://faucet.imalfect.xyz/pool/${poolname}">Claim Sponsored by: ${poolname}</a>`
     console.log(poolname);
     window.location.replace(`https://faucet.imalfect.xyz/pool/${poolname}`);
     getBal()
     captcha()


   } else if (code === "8") {
     console.log('Claiming and updating date')
     document.getElementById("claimbtn").disabled = false;
     document.getElementById("claimbtn").innerHTML
     = '<div class="subtextblack">Claimed!</div>';
     document.getElementById('sponsor').style.visibility = 'visible';
     document.getElementById('sponsor').innerHTML
     = `<a id="lime" href="https://faucet.imalfect.xyz/pool/${poolname}">Claim Sponsored by: ${poolname}</a>`
     window.location.replace(`https://faucet.imalfect.xyz/pool/${poolname}`);
          getBal()
          
          captcha()
     console.log(poolname);


   } else if (code === "5") {
     console.log('Claim locked, already claimed for today');
     document.getElementById("claimbtn").disabled = false;
     document.getElementById("claimbtn").innerHTML
     = '<div class="subtextblack">You already claimed your BANANO today.</div>';
     captcha()
     getBal()


   } else if (code === "10") {
    document.getElementById("claimbtn").disabled = false;
    document.getElementById("claimbtn").innerHTML
    = '<div class="subtextblack">oops! Try completing the captcha again</div>';
    captcha()
   }  else if (code === "20") {
    document.getElementById("claimbtn").disabled = false;
    document.getElementById("claimbtn").innerHTML
    = '<div class="subtextblack">Internal Error 420 occured.</div>';
    captcha()
   }   else if (code === "49") {
    document.getElementById("claimbtn").disabled = false;
    document.getElementById("claimbtn").innerHTML
    = '<div class="subtextblack">Internal Error 69 occured.</div>';
    captcha()
   }
    })();


   } else if (document.getElementById('address').value === '') {
     alert(`You didn't provide anything ` + "(╯°□°）╯︵ ┻━┻")
   } else {
     alert("The address you provided is invalid.")
     document.getElementById("claimbtn").innerHTML
     = "Get Banano";
   }


     
    })()



 }
 function getBal() {
   window.bananocoinBananojs.setBananodeApiUrl('https://kaliumapi.appditto.com/api')
   window.bananocoinBananojs.getAccountBalanceRaw('ban_1rp3ke75c8a3t5mkzekibo8w4mxzydrie8xzwqmkajfk9ww76f7wzbhd5bmt').then(function(response) {
    document.getElementById('sponsor').visibility = 'hidden'
     console.log(response);
     response = window.bananocoinBananojs.getBananoPartsFromRaw(response);
     var banano = response.banano;
     var banoshi = response.banoshi;
     console.log(banano + '.' + banoshi);
     document.getElementById('lime').innerHTML
     = banano + '.' + banoshi + ' BAN';
     
     if (banano < 2) {
         document.getElementById('claimbtn').disabled = true;
         document.getElementById('claimbtn').innerHTML = 
         '<div class="subtextblack">Faucet Wallet is Empty :(</div>';
     } else {
        var num = parseFloat(banano + '.' + banoshi)
        var rounded = num / 0.20
        var rounded2  = Math.floor(rounded);
        document.getElementById("maxclaims").innerHTML =
        `${rounded2}`
     }
     
   })
 }
 
const btn = document.querySelector(".btn-toggle");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.add("dark-theme");
	$('html').addClass('dark-theme');
	document.getElementById("checkbox").checked = true;

}

btn.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");

  let theme = "light";
  if (document.body.classList.contains("dark-theme")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
  location.reload();
});

 
