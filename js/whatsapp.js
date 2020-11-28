// Main js file for the whatsapp link app

var encode = (p, t) => btoa(`${p}|${t}`)

function normalizePhone(phone) {
    if (phone !== undefined) {
        if (phone[0] != 3) {
            phone = "34" + phone // Defaults to Spain
        }
        return phone.replace(/[\+ \s]/g, '')
    }
}

function initBody() {
    newMessageInput()
}

function newMessageInput() {
    $.ajax({
        type: "GET",   
        url: "views/message.html",   
        async: true,
        success: text => {
            $("#inputs").append(text)
        }
    })
}

function rmMessageInput() {
    var c = document.querySelector("#inputs").children
      , l = c.length

    l > 1 && c[l - 1].remove()
}

function generateEncodedWAPath(e) {
    var phone = $(e).find(".phone input").val()
      , text  = $(e).find(".text input").val()
    return encode(normalizePhone(phone), text)
}

function showLink(url) {
    if (url === undefined || url === "") alert("Error generating link. Take a second and breathe.")

    console.log("Showing url: " + url)
    $("#result").show()
    $("#resultLink").html(`<a href="${url}">${url}</a>`)
}

function generateLink() {
    var paths = []

    $("#inputs .message").each(function() {
        paths.push(generateEncodedWAPath(this))
    })

    showLink(selfEp + '?q=' + paths.reverse().join(','))
}