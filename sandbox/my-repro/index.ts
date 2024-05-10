import { PrismaClient, Link } from '.prisma/client'

async function main() {
  const prisma = new PrismaClient()
  /*
  const email = `user.${Date.now()}@prisma.io`
  await prisma.user.create({
    data: {
      email: email,
    },
  })

  const users = await prisma.user.findMany()
  */
 /*
  await prisma.link.create({
    data: {
      url: 'aaaaa',
      shortUrl: 'aaaaa',
      userId: '842867a2-99b1-448a-86ab-deefeb3e1f6f'
    },
  })*/
  const link = await prisma.link.findFirst()

  const handler1 = {
    async get(target:Link, prop:string, receiver:any) {
      if (prop === "user") {
        const user = await prisma.user.findFirst({
          where: {
            id: target.userId
          }
        })
        return user
      }
      return Reflect.get(target, prop, receiver);
    },
  };
  
  const proxy1 = new Proxy(link, handler1);

  const user = await proxy1.user
  //console.log(user);
}

void main().catch((e) => {
  console.log(e.message)
  process.exit(1)
})
