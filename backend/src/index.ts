import { Hono } from 'hono'
import { verify} from 'hono/jwt'
import { userRouter } from './routes/user'
import {blogRouter} from './routes/blog'

const app = new Hono<{
    Bindings:{
        DATABASE_URL : string
        JWT_SECRET : string
    }
}>() 

app.route("app/v1/user",userRouter);
app.route("app/v1/blog",blogRouter);

// middleware
app.use('/api/v1/blog/*', async (c, next) => {
 
    const header = c.req.header("authorization") || "";
    
    
	const token = header.split(' ')[1];
    
    const response = await verify (token, c.env.JWT_SECRET)
    if(response.id){
        next()
    }
    else{
        c.status(403)
        return c.json({error :"unauthorized"})
    }
    await next()
  })
  



export default app
