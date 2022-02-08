import { connect } from '../database'
export async function getOrders(id:number=0) : Promise<Response | void>{
    try {
    const conn = await connect();
    const [rows, fields] = await conn.query('SELECT * FROM mt4_orders WHERE id = ?', [id])  as any;
    return rows[0];
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}
export async function getRunOrders(limit:number=8,page:number=1, search:any=""){
    var sql = "";
    try {
    const conn = await connect();
    if(search == ""){
        sql = "SELECT *, DATE_FORMAT(opentime, '%d-%m-%Y %H:%i') as opentime, DATE_FORMAT(closetime, '%d-%m-%Y %H:%i') as closetime FROM mt4_orders WHERE close IS NULL ORDER BY id DESC LIMIT "+limit;
    }else{
        sql = "SELECT *, DATE_FORMAT(opentime, '%d-%m-%Y %H:%i') as opentime, DATE_FORMAT(closetime, '%d-%m-%Y %H:%i') as closetime FROM mt4_orders   WHERE symbol LIKE '%"+search+"%' AND close IS NULL ORDER BY id DESC LIMIT "+limit;
    }
    const [rows, fields] = await conn.query(sql)  as any;
    return rows;
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}

export async function getFinishOrders(){
    try {
    const conn = await connect();
    const [rows, fields] = await conn.query("SELECT *, DATE_FORMAT(opentime, '%d-%m-%Y %H:%i') as opentime, DATE_FORMAT(closetime, '%d-%m-%Y %H:%i') as closetime FROM mt4_orders WHERE close IS NOT NULL ORDER BY closetime DESC LIMIT 10")  as any;
    return rows;
    }
    catch (e) {
        console.log(e)
    }
    //res.json(posts[0]);
}

export async function createOrders(obj = {symbol : "", type : "", open : 0, sl : 0, tp : 0, message_id : 0, tf : "", chart : ""}) {
    try {
    const conn = await connect();
    await conn.query('INSERT INTO mt4_orders SET symbol="'+obj.symbol+'", type="'+obj.type+'", open="'+obj.open+'", sl="'+obj.sl+'", tp="'+obj.tp+'", telegram_id="'+obj.message_id+'", timefream="'+obj.tf+'", chart="'+obj.chart+'"');
    return true;
    }
    catch (e) {
        console.log(e)
    }
    return true;
}

export async function deleteOrders(obj = {id : ""}) {
    try {
    const conn = await connect();
    await conn.query('DELETE FROM mt4_orders WHERE id="'+obj.id+'"');
    return true;
    }
    catch (e) {
        console.log(e)
    }
    return true;
}

export async function closeOrders(obj = {message_id : 0, close : "", profit : "", pip : ""}) {
    try {
        const conn = await connect();
        let mysqlDate = new Date().toISOString().slice(0, 19).replace('T', ' '); 
        await conn.query("UPDATE mt4_orders SET close='"+obj.close+"', closetime='"+mysqlDate+"', profit='"+obj.profit+"', profit_pips='"+obj.pip+"' WHERE telegram_id='"+obj.message_id+"'");
        return true;
    }
    catch (e) {
        console.log(e)
    }
    return true;
    
}

export async function getSymbol(id: string= ""){
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query('SELECT * FROM mt4_symbols WHERE symbol = ?', [id]) as any;
        return rows[0];
    }
    catch (e) {
        console.log(e)
    }
    return true;

}

export async function getAllSymbol(){
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query('SELECT * FROM mt4_symbols');
        return rows;
    }
    catch (e) {
        console.log(e)
    }
    return true;

}

export async function getGroupSymbol(id: string= ""){
    try {
        const conn = await connect();
        const [rows, fields] = await conn.query('SELECT * FROM mt4_symbols WHERE symbol = ?', [id]) as any;
        return rows[0];
    }
    catch (e) {
        console.log(e)
    }
    return true;

}

export async function updateSymbolTrendParent(id: string= "", trend: string="n/a") {
    try {
        const conn = await connect();
        await conn.query('UPDATE  mt4_symbols SET parentTrend=? WHERE symbol = ?', [trend,id]);
        return true;
    //res.json(posts[0]);
    }
    catch (e) {
        console.log(e)
    }
    return true;
}
export async function updateSymbolTrendChild(id: string= "", trend: string="n/a") {
    try{
        const conn = await connect();
        await conn.query('UPDATE  mt4_symbols SET childTrend=? WHERE symbol = ?', [trend,id]);
        return true;
    //res.json(posts[0]);
    }
    catch (e) {
        console.log(e)
    }
    return true;
}
