/*
 * Most code here is ugly, not like you.
 *
 */

const baseURL = "https://wa.me"

function encode(s) {
    var a = []
	for (var n = 0, l = s.length; n < l; n ++) {
        var c = s.charAt(n)
        if (isEncodeable(c)) {
            c = s.charCodeAt(n)
            var h = Number(c).toString(16)
            h != 'a' && a.push('%' + h)
            console.debug(c + ' = ' + h)
        } else {
            a.push(c)
        }
    }
    
	return a.join('')
}

function isEncodeable(c) {
  switch (c) {
    case 'á': return false
    case 'é': return false
    case 'í': return false
    case 'ó': return false
    case 'ú': return false
    case 'ñ': return false
    case 'ç': return false
  }
  return true
}

function updateSenderPlaceholder() {
    var phone = document.getElementById("phone").value
      , senderEl = document.getElementById("selfPhone")

    senderEl.placeholder = phone ? phone : "Enter number"
}

function normalizePhones(phones) {
    ret = []
    phones.forEach(p => {
        ret.push(p.replace(/[\+ \s]/g, ''))
    })
    return ret
}

function generate() {
    var messages = document.getElementById("convo").value.split("\n")
        , phone = document.getElementById("phone").value
        , selfPhone = document.getElementById("selfPhone").value
        , n = messages.length
        , url = ''
    
    if (selfPhone === undefined || selfPhone === "") {
        selfPhone = phone
    }

    var phones = normalizePhones([phone, selfPhone])
    
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
        var convo = document.getElementById("convo")
          , i = convo.selectionStart

        convo.value =  convo.value.substring(0, i) + "\n" + convo.value.substring(i)
        convo.selectionStart = i + 1
        convo.selectionEnd = i + 1

    }
    return false
}

document.getElementById("form").onsubmit = generate
