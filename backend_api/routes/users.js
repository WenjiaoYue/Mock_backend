const router = require('koa-router')()

router.prefix('/users')

// http://10.239.158.137:3000/users
router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

// http://10.239.158.137:3000/users/bar
router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})


// pug
router.get('/pug', async (ctx, next) => {
  await ctx.render('pugTest', {
    user: "name",
    age: 18
  })
})


router.get('/list', async (ctx, next) => {
  await ctx.render('pugTest', {
    word: ['say', 'Any', 'Thing']
  })
})

module.exports = router
