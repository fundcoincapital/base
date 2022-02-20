import express, {Request, Response, NextFunction } from 'express';
import modules from '../modules/Posts';
import * as jsonfile from "./../data.json"
const router = express.Router();

router.get("/list",async (req: Request, res: Response, next: NextFunction) => {
	let data = await modules.listItems();
	res.render("posts/list",{page : jsonfile.main, data : data});
});

router.get("/info-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = req.params.id;
	let data = await modules.getItem(id);
	res.render("posts/info",{page : jsonfile.main, item : data});
});

//Export Default Router
export = router;