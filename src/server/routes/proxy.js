const express = require('express')
const router = express.Router()
const request = require('request')
const cheerio = require('cheerio')

router.get('/', (req, res) => {
  let url = req.query.url
  if (url.indexOf('://') === -1) {
    url = 'http://' + url
    if (!url.match(/\/$/)) {
      url += '/'
    }
  }

  request.get(url, (error, response, body) => {
    if (!error) {
      const html = rewrite(body, url)
      const key = 'Cache-Control'
      const value = 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
      res.header(key, value)
      res.send(html)
    }
  })
})

function rewrite(html, url) {
  const $ = cheerio.load(html)
  const base = '<base href=\'' + url + '\' />\n'

  $('head').append(base)
  $('img[src^="public"]').each(() => {
    $(this).attr('href', url + '/' + $(this).attr('href'))
  })

  $('a:not([href^="http://"])' +
    ':not([href^="https://"])' +
    ':not([href^="//"])' +
    ':not([href^="javascript:"])')
    .each(() => {
      $(this).attr('href', url + $(this).attr('href'))
    })

  $('img:not([src^="http://"])' +
    ':not([src^="https://"])' +
    ':not([src^="//"])')
    .each(() => {
      $(this).attr('src', url + $(this).attr('src'))
    })

  $('link:not([href^="http://"])' +
    ':not([href^="https://"])' +
    ':not([href^="//"])')
    .each(() => {
      $(this).attr('href', url + $(this).attr('href'))
    })

  $('script[src]:not([src^="http://"])' +
    ':not([src^="https://"])' +
    ':not([src^="//"])')
    .each(() => {
      $(this).attr('src', url + $(this).attr('src'))
    })


  if (process.env.NODE_ENV === 'production') {
    $('a').each(() => {
      $(this).attr('href', 'http://localhost/proxy?url=' + $(this).attr('href'))
    })
  }

  if (process.env.NODE_ENV === 'development') {
    $('a').each(() => {
      $(this).attr('href', 'http://localhost:3000/proxy?url=' + $(this).attr('href'))
    })
  }

  return $.html()
}

module.exports = router