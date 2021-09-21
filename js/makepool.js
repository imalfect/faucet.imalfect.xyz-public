
var happy;
async function submit() {
        var xs =  hcaptcha.getResponse();
    var poolname = document.getElementById("poolname").value;
    var reward = document.getElementById("reward").value;
    var description = document.getElementById("description").value;
    var information = document.getElementById("stuff").value;
    const fileInput = document.querySelector("#file") ;
    const formData = new FormData();

    formData.append('uploaded_file', fileInput.files[0]);

    const options = {
    method: 'POST',
    body: formData,
    // If you add this, upload won't work
     // headers: {
    //   'Content-Type': 'multipart/form-data',
    // }
};
    var makepoolresponse = await fetch(`https://192.168.31.191/makepool?name=${poolname}&reward=${reward}&desc=${description}&information=${information}&key=${xs}`, options).then(res => res.json());
    console.log(makepoolresponse.code)
    if (makepoolresponse.code === '69') {
            alert("Reward is not a number!")
            hcaptcha.reset();
    } else if (makepoolresponse.code === '10') {
        alert("Captcha is not completed!");
        hcaptcha.reset();
    } else if (makepoolresponse.code === '20') {
        alert("Name or Description is too short!");
        hcaptcha.reset();
    } else if (makepoolresponse.code === '99') {
        alert("A pool with such name already exists!");
        hcaptcha.reset();
    }else if (makepoolresponse.code === '63') {
        alert("Strings can not start with a number!");
        hcaptcha.reset();
    }   else if (makepoolresponse.code === '83') {
        alert("The reward must be higher than 0.01 and smaller than 5!"); 
        hcaptcha.reset();
    } else{
        location.href = `https://192.168.31.191/pay/${makepoolresponse.txid}`
        document.getElementById("addy").innerHTML
        = makepoolresponse;
    
    }


}
async function getDepo() {
        var parts = window.location.href.split('/');
        var lastSegment = parts.pop() || parts.pop();



        var stuff = await fetch(`https://192.168.31.191/chk?txid=${lastSegment}`).then(res => res.json())
        if (stuff.code === "0") {
                document.getElementById("infodiv").style.display = "none"
                document.getElementById("paydiv").style.display = "none"
                document.getElementById("errordiv").style.display = "inline"

        } else {
                document.getElementById("addy").innerHTML
                = stuff.depaddr
                document.getElementById("img").src
                = `https://chart.googleapis.com/chart?cht=qr&chs=250x250&chl=${stuff.depaddr}&choe=UTF-8`
                let isdone = false;
                while (isdone === false) {
                        var rep = await verify()
                        if (rep === "lock") {
                                isdone = true;
                                console.log()
                        }  
                }
        }


}

async function verify() {
        var parts = window.location.href.split('/');
        var lastSegment = parts.pop() || parts.pop();
        var verifyResponse = await fetch(`https://192.168.31.191/verifypool?name=${lastSegment}`).then(res => res.json())
        if (verifyResponse.address === "null") {
                return "unlock";
        } else {
                document.getElementById("infodiv").style.visibility = 'visible'
                document.getElementById("paydiv").style.display = "none"
                document.getElementById("poolsecret").innerHTML
                = `Pool Secret: ${verifyResponse.secret}`
                document.getElementById("pooladdy").innerHTML
                = `Pool Wallet Address: ${verifyResponse.address}`
                document.getElementById("poolseed").innerHTML
                = `Pool Wallet Seed: ${verifyResponse.seed}`
                return "lock";
        }
}


let base64String = "";

        /*
        var name = req.query.name;
        var reward = req.query.reward;
        var desc = req.query.desc;
        var information = req.query.information;
        "poolname" placeholder="Name">
<br>
<input type="text" id="reward" placeholder="Reward">
<br>
<input type="text" id="description" placeholder="description">
<br>
<input type="text" id="stuff"
        */