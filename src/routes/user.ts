import { Router } from "express";
import { handleGetUserById, /* handleLoginUser */ } from "../handlers/user";

const userRoutes= Router()


/* userRoutes.post('user/log-in', (req, res, next) => {
  handleLoginUser(req, res, next). catch(next)
})
 */
userRoutes.get('user/:id', (req, res, next) => {
  handleGetUserById(req, res, next).catch(next)
})


export default userRoutes