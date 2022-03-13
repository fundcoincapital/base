import { connect } from '../database'
const dbName = "template_design";
const searchField = "name";
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

const listItems = async() =>{
	try {
        const conn = await connect();
        const [rows, fields] = await conn.query("SELECT *,DATE_FORMAT(start_time, '%d-%m-%Y %H:%i') as start_time, DATE_FORMAT(end_time, '%d-%m-%Y %H:%i') as end_time FROM template_design  ORDER BY sort_db ASC LIMIT 100")  as any;
        return rows;
    }
    catch (e) {
        return [];
    }
    return [];
}

const createItem = async(obj = {name : "", contents : "", customs_css : "", customs_javascript : "", display : "", status : "", start_time : "", end_time : "", sort_db : ""}) =>{
    try {
        const conn = await connect();
        await conn.query('INSERT INTO template_design SET name="'+obj.name+'", `contents`=\''+obj.contents+'\', `customs_css`=\''+obj.customs_css+'\', `customs_javascript`=\''+obj.customs_javascript+'\', display="'+obj.display+'", status="'+obj.status+'", start_time="'+obj.start_time+'", end_time="'+obj.end_time+'", sort_db="'+obj.sort_db+'"');
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
    return true;
}

const updateItem = async(id:number=0,obj = { name : "", contents : "", customs_css : "", customs_javascript : "", display : "", status : "", start_time : "", end_time : "", sort_db : ""}) =>{
    try {
        const conn = await connect();
        
        await conn.query('UPDATE template_design SET name="'+obj.name+'", `contents`=\''+obj.contents+'\', `customs_css`=\''+obj.customs_css+'\', `customs_javascript`=\''+obj.customs_javascript+'\', display="'+obj.display+'", status="'+obj.status+'", start_time="'+obj.start_time+'", end_time="'+obj.end_time+'", sort_db="'+obj.sort_db+'" WHERE id = "'+id+'"');
        return true;
    }
    catch (e) {
        console.log(e);
        return false;
    }
    return true;
}

const deleteItem = async function(id:number = 0) {
    try {
    const conn = await connect();
    await conn.query('DELETE FROM template_design WHERE id="'+id+'"');
    return true;
    }
    catch (e) {
        return true;
    }
    return true;
}

export default {getItem, listItems, createItem, updateItem, deleteItem};