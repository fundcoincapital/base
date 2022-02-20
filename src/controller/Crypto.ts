import express, {Request, Response, NextFunction } from 'express';
import modules from '../modules/Crypto';
import * as jsonfile from "./../data.json"
const router = express.Router();

router.get("/list",async (req: Request, res: Response, next: NextFunction) => {
	let data = await modules.listItems();
	res.render("crypto/list",{page : jsonfile.main, data : data});
});

router.get("/info-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = req.params.id;
	let data = await modules.getItem(id);
	res.render("crypto/info",{page : jsonfile.main, item : data});
});

//Export Default Router
export = router;