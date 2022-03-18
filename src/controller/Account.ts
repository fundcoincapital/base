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

router.get("/login",async (req: Request, res: Response, next: NextFunction) => {
	
	res.render("account/login",{page : page});
});

router.get("/register",async (req: Request, res: Response, next: NextFunction) => {
	
	res.render("account/register",{page : page});
});

router.get("/validate",async (req: Request, res: Response, next: NextFunction) => {
	
	res.render("account/validate",{page : page});
});


router.get("/bank",async (req: Request, res: Response, next: NextFunction) => {
	
	res.render("account/bank",{page : page});
});


router.get("/history",async (req: Request, res: Response, next: NextFunction) => {
	
	res.render("account/history",{page : page});
});

//Export Default Router
export = router;