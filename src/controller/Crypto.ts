import express, {Request, Response, NextFunction } from 'express';
import modules from '../modules/Crypto';
const page = {title : "Crypto", description : ""};
const router = express.Router();

router.get("/",async (req: Request, res: Response, next: NextFunction) => {
	let data = await modules.listItems();
	res.render("crypto/list",{page : page, data : data});
});

router.get("/info-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = Number(req.params.id);
	let data = await modules.getItem(id);
	res.render("crypto/info",{page : page, item : data});
});

//Export Default Router
export = router;