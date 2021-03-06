import { connect } from '../database'
const dbName = "accounts";
const searchField = "email";
const prikeyField = "id";
const getItem = async(id:number=0) =>{
	try {
        const conn = await connect();
        
        var sql = `SELECT * FROM ${dbName} WHERE ${prikeyField}=${id}`;
        const [rows, fields] = await conn.query(sql)  as any;
        return rows[0];
    }
    catch (e) {
        return {};
    }
    return true;
}

const getUserLogin = async(username:string="", password:string="") =>{
    try {
        const conn = await connect();
        
        var sql = `SELECT * FROM ${dbName} WHERE username='${username}' AND password='${password}' AND status != 'off' LIMIT 1`;
        const [rows, fields] = await conn.query(sql)  as any;
        return rows[0];
    }
    catch (e) {
        return {};
    }
    return true;
}

const setValidateWait1 = async(id:number=0, file:string="") => {
    try {
        const conn = await connect();
        var sql = `UPDATE ${dbName} SET document_validate_file='${file}' WHERE ${prikeyField}=${id}`;
        await conn.query(sql);
        return true;
    }
    catch (e) {
        return false;
    }
    return true;
}

const setValidateWait2 = async(id:number=0, file:string="") => {
    try {
        const conn = await connect();
        var sql = `UPDATE ${dbName} SET passport_validate_file='${file}' WHERE ${prikeyField}=${id}`;
        await conn.query(sql);
        return true;
    }
    catch (e) {
        return false;
    }
    return true;
}

const listItems = async(limit:number=8,page:number=1, search:any="") =>{
	var sql = "";
    try {
    const conn = await connect();
    if(search == ""){
        sql = `SELECT * FROM ${dbName} ORDER BY id DESC LIMIT ${limit}`;
    }else{
        sql = `SELECT * FROM ${dbName} WHERE ${searchField} LIKE '%"+search+"%'  ORDER BY id DESC LIMIT ${limit}`;
    }
    const [rows, fields] = await conn.query(sql)  as any;
    
    return rows;
    }
    catch (e) {
        return [];
    }
}

const createItem = async(obj = "") =>{
	try {
        const conn = await connect();
        var sql = `INSERT INTO ${dbName} SET ${obj}`;
        await conn.query(sql);
        return true;
    }
    catch (e) {
        return false;
    }
    return true;
}

const createUserLogin = async(username:string="", email:string="", password:string="") =>{
    try {
        const conn = await connect();
        var sql = `INSERT INTO ${dbName} SET username='${username}', email='${email}', password='${password}'`;
        await conn.query(sql);
        return true;
    }
    catch (e) {
        return false;
    }
    return true;
}



const updateItem = async(id:number=0, obj="") =>{
	try {
        const conn = await connect();
        var sql = `UPDATE ${dbName} SET ${obj} WHERE ${prikeyField}=${id}`;
        await conn.query(sql);
        return true;
    }
    catch (e) {
        return false;
    }
    return true;
}

const changePassword = async(id:number=0, password:string="") => {
    try {
        const conn = await connect();
        var sql = `UPDATE ${dbName} SET password='${password}' WHERE ${prikeyField}=${id}`;
        await conn.query(sql);
        return true;
    }
    catch (e) {
        return false;
    }
    return true;
};

const deleteItem = async(id:number=0) =>{
	try {
    const conn = await connect();
    var sql = `DELETE FROM ${dbName} WHERE ${prikeyField}=${id}`;
    await conn.query(sql);
    return true;
    }
    catch (e) {
        return true;
    }
    return true;
}

export default {getItem, listItems, createItem, updateItem, deleteItem, getUserLogin, setValidateWait1, setValidateWait2, createUserLogin, changePassword};