import fetch from 'node-fetch'

let handler = async(m, { conn, groupMetadata, usedPrefix, text, args, command }) => {

if (command == 'quotegarden') {
try {
if (!text) return 
let res = await fetch(`https://quote-garden.herokuapp.com/api/v3/quotes`)
  let sul = await res.json()
  let xx = sul.data
  let x = xx.getRandom()
  await conn.sendButton(m.chat, `*Quotes:*
  ${x.quoteText}
  
  *Author:* ${x.quoteAuthor}
  *Genre:* ${x.quoteGenre}
  *Id:* ${x._id}`, wm, null, [
                ['Next', `${usedPrefix + command} ${x.nextPage}`],
                ['Again', `${usedPrefix + command} ${x.currentPage}`],
                ['Translate', `${usedPrefix}tr id ${x.quoteText}`]
            ], m)
    } catch {
    let res = await fetch(`https://quote-garden.herokuapp.com/api/v3/quotes?page=${text}`)
  let sul = await res.json()
  let xx = sul.data
  let x = xx.getRandom()
  await conn.sendButton(m.chat, `*Quotes:*
  ${x.quoteText}
  
  *Author:* ${x.quoteAuthor}
  *Genre:* ${x.quoteGenre}
  *Id:* ${x._id}`, wm, null, [
                ['Next', `${usedPrefix + command} ${x.nextPage}`],
                ['Again', `${usedPrefix + command} ${x.currentPage}`],
                ['Translate', `${usedPrefix}tr id ${x.quoteText}`]
            ], m)
         }
}

if (command == 'quotable') {
let res = await fetch(`https://api.quotable.io/random`)
  let x = await res.json()
  await conn.sendButton(m.chat, `*Quotes:*
  ${x.content}
  
  *Author:* ${x.author}
  *Date Added:* ${x.dateAdded}
  *Date Modif:* ${x.dateModified}
  *Id:* ${x._id}`, wm, null, [
                ['Next', `${usedPrefix + command}`],
                ['Translate', `${usedPrefix}tr id ${x.content}`]
            ], m)
}

if (command == 'inspiration') {
let res = await fetch(`https://api.goprogram.ai/inspiration`)
  let x = await res.json()
  await conn.sendButton(m.chat, `*Quotes:*
  ${x.quote}
  
  *Author:* ${x.author}`, wm, null, [
                ['Next', `${usedPrefix + command}`],
                ['Translate', `${usedPrefix}tr id ${x.quote}`]
            ], m)
}

}
handler.command = handler.help = ['quotegarden', 'quotable', 'inspiration']
handler.tags = ['quotes']

export default handler