const baseURL = "https://wa.me"

function encode(s) {
    var a = []
	for (var n = 0, l = s.length; n < l; n ++) {
        c = s.charCodeAt(n)
        var h = Number(c).toString(16)
        h != 'a' && a.push(h)
        console.debug(c + ' = ' + h)
    }
    
	return a.length > 0 ? '%' + a.join('%') : ""
}

function generate() {
    var messages = document.getElementById("convo").value.split("\n")
        , phone = document.getElementById("phone").value.trim()
        , selfPhone = document.getElementById("selfPhone").value.trim()
        , n = messages.length
        , url = ''
    
    if (selfPhone === undefined || selfPhone === "") {
        selfPhone = phone
    }

    var phones = [phone, selfPhone]
    
    console.debug(messages)
    console.debug(phone)
    console.debug(selfPhone)
    messages.reverse().forEach((m, i) => {
        if (url != "" ) {
            url = ` (${url})`
        }
        if (m != "") {
            url = baseURL + "/" + phones[(n - 1 - i) % 2] + '?text=' + encode(m + url)
        }
    })
    console.debug(url)
    document.getElementById("resultBox").style.visibility = 'visible'
    document.getElementById("result").innerHTML = `<a href="${url}">${url}</a>`
}

function textareaEnter() {
    if (window.event.keyCode == 13) {
        document.getElementById("convo").value = document.getElementById("convo").value + '\n' 
    }
    return false
}

document.getElementById("form").onsubmit = generate
