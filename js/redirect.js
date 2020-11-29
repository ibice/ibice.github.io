// This file intercepts queries and redirects the client
const queryString = window.location.search
    , params = new URLSearchParams(queryString)
    , selfEp = window.location.toString().split('?')[0]
    , waEp = 'https://wa.me/'

var decode = s => atob(s).split('|')
  , genWALink = (p, t) => `${waEp}${p}?text=${t}`

if (params.has('q')) {
    var messages = params.get('q').split(',')
      , els = decode(messages.pop())
      , waURL = genWALink(els[0], els[1])

    if (messages.length > 0) waURL += ' (' + selfEp + '?q=' + messages.join(',') + ')'

    console.log('Redirecting client to ' + waURL)
    window.location.href = waURL
}