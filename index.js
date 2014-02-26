var fs = require('fs')
var path = require('path')

var imgur = require('imgur-upload')

var keyloc = process.env.HOME + '/.imgurkey'

if (!fs.existsSync(keyloc)) {
    console.error('Please put your imgur Client ID in ~/.imgurkey')
    console.error('You can get one for anyonymous usage here: https://api.imgur.com/oauth2/addclient')
    process.exit(1)
}

var cid = fs.readFileSync(keyloc, 'utf8').replace(/[\n\r\t\s]/gm, '');

imgur.setClientID(cid);

imgur.upload(process.argv[2],function(err, res){
    if (err) return console.error(err)
    if (res.data.error) return console.error(res.data.error)
    console.log(res.data.link); //log the imgur url
})