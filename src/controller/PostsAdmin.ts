import express, {Request, Response, NextFunction } from 'express';
import modules from '../modules/Posts';
import * as jsonfile from "./../data.json"
const router = express.Router();

router.get("/manager.html",async (req: Request, res: Response, next: NextFunction) => {
	let data = await modules.listItems();
	res.render("posts/manager",{page : jsonfile.main, data : data});
});

router.get("/info-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = req.params.id;
	let data = await modules.getItem(id);
	res.render("posts/info",{page : jsonfile.main, item : data});
});

router.get("/create",async (req: Request, res: Response, next: NextFunction) => {
	
	res.render("posts/create",{page : jsonfile.main});
});

router.post("/create",async (req: Request, res: Response, next: NextFunction) => {
	await modules.createItem(req.body);
	res.redirect('/posts/manager.html');
});

router.get("/edit-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = req.params.id;
	let data = await modules.getItem(id);
	res.render("posts/edit",{page : jsonfile.main,item : data});
});

router.post("/edit-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = req.params.id;
	await modules.updateItem(id,req.body);
	res.redirect('/posts/manager.html');
});

router.post("/delete-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = req.params.id;
	await modules.updateItem(id,req.body);
	res.redirect('/posts/manager.html');
});

//Export Default Router
export = router;