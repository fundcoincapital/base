import express, {Request, Response, NextFunction } from 'express';
import modules from '../modules/Account';
const page = {title : "Account", description : ""};
const router = express.Router();

router.get("/",async (req: Request, res: Response, next: NextFunction) => {
	let data = await modules.listItems();
	res.render("account/list",{page : page, data : data});
});

router.get("/info-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = Number(req.params.id);
	let data = await modules.getItem(id);
	res.render("account/info",{page : page, item : data});
});

//Export Default Router
export = router;