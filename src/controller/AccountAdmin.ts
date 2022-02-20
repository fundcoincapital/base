import express, {Request, Response, NextFunction } from 'express';
import modules from '../modules/Account';
import * as jsonfile from "./../data.json"
const router = express.Router();

router.get("/manager.html",async (req: Request, res: Response, next: NextFunction) => {
	let data = await modules.listItems();
	res.render("account/manager",{page : jsonfile.main, data : data});
});

router.get("/info-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = req.params.id;
	let data = await modules.getItem(id);
	res.render("account/info",{page : jsonfile.main, item : data});
});

router.get("/create",async (req: Request, res: Response, next: NextFunction) => {
	
	res.render("account/create",{page : jsonfile.main});
});

router.post("/create",async (req: Request, res: Response, next: NextFunction) => {
	await modules.createItem(req.body);
	res.redirect('/account/manager.html');
});

router.get("/edit-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = req.params.id;
	let data = await modules.getItem(id);
	res.render("account/edit",{page : jsonfile.main,item : data});
});

router.post("/edit-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = req.params.id;
	await modules.updateItem(id,req.body);
	res.redirect('/account/manager.html');
});

router.post("/delete-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = req.params.id;
	await modules.updateItem(id,req.body);
	res.redirect('/account/manager.html');
});

//Export Default Router
export = router;