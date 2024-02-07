const { PassThrough } = require('stream');
const router = require('koa-router')()


// GET
// no params http://10.239.158.137:3000
router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})
// no params http://10.239.158.137:3000/string
router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})
// no params http://10.239.158.137:3000/json
router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
// params http://10.239.158.137:3000/get?size=1
router.get('/get', async (ctx, next) => {
  const { size } = ctx.query
  await ctx.render('index', {
    title: `Hello params! ${size}`
  })
})
// router http://10.239.158.137:3000/get/koa
router.get('/get/:id', async (ctx, next) => {
  const { id } = ctx.params
  await ctx.render('index', {
    title: `Hello router! ${id}`
  })
})

router.post('/test', async (ctx, next) => {
  const { name, id } = ctx.request.body
  ctx.body = {
    name:`your???${name}`,
    id: `${id}`,
  }
})


// POST
//  http://10.239.158.137:3000/post
router.post('/post', async (ctx, next) => {
  await next();

  const receivedData = ctx.request.body;
    const {  id, name } = ctx.request.body
  // console.log(' ctx.request.body',  ctx.request.body);
  const transformedData = JSON.parse(JSON.stringify(receivedData));
  console.log('transformedData', transformedData);
  // console.log('id', id);
  
  // ctx.body = {
  //   name:`your response is ${name}`,
  //   id: `${id}`,
  // }

  ctx.body = {
    "idsid": `${id}`,
    "name": `${name}`,
    "given_name": "Ning",
    "wwid": "11599047",
    "email_address": "ning.han@intel.com",
    "distinguished_name": "CN=Han\\, Ning,OU=Workers,DC=ccr,DC=corp,DC=intel,DC=com",
    "account": "ccr\\ninghan",
    "generic": false,
    "SuperGroup": "ICG SG",
    "Group": "SATGC Grp",
    "Division": "SO CN DIV",
    "DivisionLong": "CHINA SOFTWARE OPS DIV",
    "CostCenterLong": "SSE LCSE PRC SH 764 RND",
    "mgrWWID": "10689345"
}
})

// steaming response
const sendMessage = async (stream) => {
  const data = [
    'This line of code is used in Python to launch an interface.',
    'This is useful when you want to allow multiple users to access the interface at the same time.',
    "```python\\r\\n",
    'import numpy as np\\r\\n',
    'import pandas as pd\\r\\n',
    'url ',
    '=',
    '"https://raw.githubusercontent.com/jbrownlee/Datasets/master/housing.csv"\\r\\n',
    'data = pd.read_csv(url, delim_whitespace=True, names=names)',
    "```\\r\\n",
    'here\'s an example of how you can modify the code',
    '[DONE]'
  ];

    for (const value of data) {
      stream.write(`data: ${value}\n\n`);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    stream.end();
};

router.get('/stream_get', async (ctx) => {
  // 1. response header
  ctx.set({
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream', // 表示返回数据是个 stream
  });

  // 2. create stream
  const stream = new PassThrough();
  ctx.body = stream;
  ctx.status = 200;

  // 3. push streaming data
  sendMessage(stream, ctx);
});


router.post('/stream_post', async (ctx) => {
  // 1. response header
  ctx.set({
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream', // return data stream
  });

  // 2. create stream
  const stream = new PassThrough();
  ctx.body = stream;
  ctx.status = 200;

  // 3. push streaming data
  sendMessage(stream, ctx);
});


module.exports = router
