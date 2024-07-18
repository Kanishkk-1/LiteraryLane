import { Hono } from "hono";
import { withAccelerate } from '@prisma/extension-accelerate'
import { PrismaClient } from '@prisma/client/edge'
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();



blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || ""
    const user = verify(authHeader, c.env.JWT_SECRET)

    if (user) {
        c.set("userId", user.id);
        next()
    } else {
        c.status(403)
        return c.json({
            message: "You are not logged in"
        })
    }
    // next()   
})


blogRouter.post('/', async (c) => {

	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const post = await prisma.post.create({
		data: {
			title: body.title,
			content: body.content,
			authorId: userId
		}
	});
	return c.json({
		id: post.id
	});
})



blogRouter.put('/', async (c) => {

    const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	prisma.post.update({
		where: {
			id: body.id,
			authorId: userId
		},
		data: {
			title: body.title,
			content: body.content
		}
	});

	return c.text('updated post');
})

blogRouter.get('/', async (c) => {

    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());
        const body = await c.req.json();

        const post = await prisma.post.findFirst({

            where: {
                id: body.id
            }
        })

        return c.json({
           post
        });
    }
    catch (e) {
        c.status(411);
        return c.json({
            message: " error while fetching blog post "
        });
    }
})


//Todo : add pagination
blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany();

    return c.json({
        posts
    })
})
