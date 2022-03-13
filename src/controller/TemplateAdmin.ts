import express, {Request, Response, NextFunction } from 'express';
import modules from '../modules/Template';
const page = {title : "Template", description : ""};
const router = express.Router();
import fs from 'fs';
router.get("/",async (req: Request, res: Response, next: NextFunction) => {
	let data = await modules.listItems();
	res.render("template/manager",{page : page, data : data});
});

router.get("/info-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = Number(req.params.id);
	let data = await modules.getItem(id);
	res.render("template/info",{page : page, item : data});
});

router.get("/create",async (req: Request, res: Response, next: NextFunction) => {
	
	res.render("template/create",{page : page, item : []});
});

router.post("/create",async (req: Request, res: Response, next: NextFunction) => {
	await modules.createItem(req.body);
	res.redirect('/template');
});

router.get("/edit-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = Number(req.params.id);
	let data = await modules.getItem(id);
	res.render("template/create",{page : page,item : data});
});

router.post("/edit-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = Number(req.params.id);
	await modules.updateItem(id,req.body);
	res.redirect('/template');
});

router.post("/delete-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = Number(req.params.id);
	await modules.updateItem(id,req.body);
	res.redirect('/template');
});

router.get("/render", async (req: Request, res: Response, next: NextFunction) => {
	let data = await modules.listBlock();
	var obj:string = "";
	
	for (let item of data) {
		obj += String(item.contents);
	}
	try {
	  fs.writeFileSync(__dirname + '/../views/home.html', obj);
	  //file written successfully
	} catch (err) {
	  console.error(err)
	}
	res.redirect('/template');
});


//Export Default Router
export = router;