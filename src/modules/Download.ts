import { connect } from '../database'

export async function getDownload(limit:number=8,page:number=1){
    try {
    const conn = await connect();
    const [rows, fields] = await conn.query("SELECT *, DATE_FORMAT(opentime, '%d-%m-%Y %H:%i') as opentime, DATE_FORMAT(closetime, '%d-%m-%Y %H:%i') as closetime FROM mt4_orders WHERE close IS NULL ORDER BY id DESC LIMIT "+limit)  as any;
    return rows;
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}