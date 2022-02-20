import express, {Request, Response, NextFunction } from 'express';
import modules from '../modules/Crypto';
import * as jsonfile from "./../data.json"
const router = express.Router();

router.get("/manager.html",async (req: Request, res: Response, next: NextFunction) => {
	let data = await modules.listItems();
	res.render("crypto/manager",{page : jsonfile.main, data : data});
});

router.get("/info-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = req.params.id;
	let data = await modules.getItem(id);
	res.render("crypto/info",{page : jsonfile.main, item : data});
});

router.get("/create",async (req: Request, res: Response, next: NextFunction) => {
	
	res.render("crypto/create",{page : jsonfile.main});
});

router.post("/create",async (req: Request, res: Response, next: NextFunction) => {
	await modules.createItem(req.body);
	res.redirect('/crypto/manager.html');
});

router.get("/edit-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = req.params.id;
	let data = await modules.getItem(id);
	res.render("crypto/edit",{page : jsonfile.main,item : data});
});

router.post("/edit-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = req.params.id;
	await modules.updateItem(id,req.body);
	res.redirect('/crypto/manager.html');
});

router.post("/delete-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = req.params.id;
	await modules.updateItem(id,req.body);
	res.redirect('/crypto/manager.html');
});

//Export Default Router
export = router;