import express, {Request, Response, NextFunction } from 'express';
import session  from 'express-session';
import modules from '../modules/Account';
const page = {title : "Account", description : ""};
const router = express.Router();

declare module "express-session" {
  interface Session {
    user: {
    	username :  "",
    	email :  "",
    	id :  0,
    	token: ""
    }
  }
}

router.use(session({
	secret: 'secret',
	resave: true, 
	saveUninitialized: true
}));
 
const checkLogin = async (req: Request, res: Response, next: NextFunction) =>{
	//req.session.cookie.loggedin = false;
	if(req.session.user !== undefined)
    { 
    	console.log(req.session.user);
    	//res.send("Access");
		return next();
    	
    }else{
    	res.redirect('/account/login');
    	res.end();
    }
	
	return true;
}

router.get("/",checkLogin, async (req: Request, res: Response, next: NextFunction) => {
	let data = await modules.listItems();
	res.render("account/list",{page : page, data : data, user : req.session.user});
});

router.get("/info-(:id).html",async (req: Request, res: Response, next: NextFunction) => {
	var id = Number(req.params.id);
	let data = await modules.getItem(id);
	res.render("account/info",{page : page, item : req.session.user});
});

router.get("/login",async (req: Request, res: Response, next: NextFunction) => {
	
	res.render("account/login",{page : page});
});

router.post("/login",async (req: Request, res: Response, next: NextFunction) => {
	
	var username = req.body.username;
	var password = req.body.password;
	var remember = req.body.remember;
	if (username && password) {
		let data = await modules.getUserLogin(username, password);

		if(data != null && data != undefined){
			req.session.user = data;
			//req.session.id = Number(data.id);
			//req.session.token = "";
			res.redirect('/account');
		}
	}
	res.redirect('/account/login');
});

router.get("/register",async (req: Request, res: Response, next: NextFunction) => {
	
	res.render("account/register",{page : page});
});

router.get("/validate",checkLogin, async (req: Request, res: Response, next: NextFunction) => {
	
	res.render("account/validate",{page : page});
});

router.get("/validate/step-2",checkLogin, async (req: Request, res: Response, next: NextFunction) => {
	
	res.render("account/validate-2",{page : page});
});

router.post("/validate",checkLogin, async (req: Request, res: Response, next: NextFunction) => {
	var getdocument;
	if(req.file){
		getdocument = "/"+req.file.filename;
	}
	await modules.setValidateWait1(req.session.user.id, getdocument);
	res.redirect('/account/validate/step-2');
});

router.post("/validate/step-2",checkLogin, async (req: Request, res: Response, next: NextFunction) => {
	var getdocument;
	if(req.file){
		getdocument = "/"+req.file.filename;
	}
	await modules.setValidateWait2(req.session.user.id, getdocument);
	res.render("account/validate",{page : page});
});


router.get("/bank",checkLogin, async (req: Request, res: Response, next: NextFunction) => {
	
	res.render("account/bank",{page : page});
});


router.get("/history",checkLogin, async (req: Request, res: Response, next: NextFunction) => {
	
	res.render("account/history",{page : page});
});


//Export Default Router
export = router;