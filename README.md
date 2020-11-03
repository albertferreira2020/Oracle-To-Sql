# Oracle-To-Sql
Migrate data with Select in Oracle database for input SqlServer

```Javascript
var nodemailer = require('nodemailer');
var oracledb = require('oracledb');  
var sql = require("mssql");
const fileconfig = require("./config.js");  

const dbconfig = fileconfig.dbconfig 
const email = fileconfig.email 
const transporte = fileconfig.transporte 
   
var conn = new sql.Connection(dbConfig);
    
    function replacenull(dado){
    if(dado == null){
    return "";   
    }else{
    return dado.replace(/'/g, '').replace(/"/g, '');
    }    
    }
    
    
    function replacenullmoney(dadox){
        if(dadox == null){
        return "0.00" ;    
        }
        return dadox;
    }
    
    function formatadata(d){
    
    if (d == null || d == ''){
    return "01/01/1900"}
    else{
            return d;//[ano , mes, dia ].join('-');
        }
      
    }
 
    function doRelease(connection) {  
       connection.release(  
            function(err) {  
                 if (err) {console.error(err.message); transporte.sendMail(email, function(err, info){if(err){throw err;console.log('Email Enviado: ', info);} }); }  
            }  
       );  
    }  

 


oracledb.getConnection({  
    user: "userdatabaseoracle",  
    password: "passworddatabaseoracle",  
    connectString: "(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = xxxxxxxxxx)(PORT = 1521)) (CONNECT_DATA = (SERVER = DEDICATED)(SERVICE_NAME = xxxxxxxxxx)))",
    extendedMetaData: true,
 
    poolTimeout: 60,
    poolMin: 10,
    poolMax: 25,
    queueRequests: true,
    queueTimeout: 600000,
    _enableStats: true
 
 },

function(err, connection) {  
   if (err) {  
        //console.error('erro: ' + err.message);
        
        conn.connect().then(() => {
            var req = new sql.Request(conn); 

            datetime = new Date();
            datetime = datetime.getUTCFullYear() + '-' + ('00' + (datetime.getUTCMonth() + 1)).slice(-2) + '-' + ('00' + datetime.getUTCDate()).slice(-2) + ' ' + ('00' + datetime.getUTCHours()).slice(-2) + ':' + ('00' + datetime.getUTCMinutes()).slice(-2) + ':' + ('00' + datetime.getUTCSeconds()).slice(-2);   
            
            req.query("INSERT INTO Log_ETL (data, tabela, msg) values('" + datetime + "','Utilizacao','" + err.message + "') ");
            conn.close();
        });

        transporte.sendMail(email, function(err, info){if(err){throw err;console.log('Email Enviado: ', info);} });

        return;  
}  
   console.error('Connect Oracle...');
   console.error('Exec Query');
   console.error(competencia);
   

   connection.execute( `
        Select * from OracleDataOrigin         
          
   `,  

[],  




 
function(err, recordset) {  
        if (err) {  
             console.error(err.message);  
             doRelease(connection);  

             conn.connect().then(() => {
                var req = new sql.Request(conn); 
    
                datetime = new Date();
                datetime = datetime.getUTCFullYear() + '-' + ('00' + (datetime.getUTCMonth() + 1)).slice(-2) + '-' + ('00' + datetime.getUTCDate()).slice(-2) + ' ' + ('00' + datetime.getUTCHours()).slice(-2) + ':' + ('00' + datetime.getUTCMinutes()).slice(-2) + ':' + ('00' + datetime.getUTCSeconds()).slice(-2);   
                
                req.query("INSERT INTO Log_ETL (data, tabela, msg) values('" + datetime + "','Utilizacao','" + err.message + "') ");
                conn.close();
            });

            transporte.sendMail(email, function(err, info){if(err){throw err;console.log('Email send: ', info);} });
    

             return;  
        }  

        //console.log(recordset.metaData)
        //console.log(recordset.rows[0])

 ////////////Connect sqlserver

 conn.connect().then(() => {
    var req = new sql.Request(conn);
    console.log('Limpando Tabela...');
     req.query("DELETE FROM DESTINY TABLE");
    console.log('input data...');
    for (var i = 0; i < recordset.rows.length; i++) {

        field1	=recordset.rows[i][0]
        field2	=recordset.rows[i][1] //..............
    
    req.query(`
    INSERT INTO TableDestiny
    )
VALUES
    (
    
        '`+field1+`'
        ,'`+field2+`'  
         
    )
      
    `).catch(function(err){console.log('erro: ' + recordset.rows[i] + err);

 

})
}

datetime = new Date();
datetime = datetime.getUTCFullYear() + '-' + ('00' + (datetime.getUTCMonth() + 1)).slice(-2) + '-' + ('00' + datetime.getUTCDate()).slice(-2) + ' ' + ('00' + datetime.getUTCHours()).slice(-2) + ':' + ('00' + datetime.getUTCMinutes()).slice(-2) + ':' + ('00' + datetime.getUTCSeconds()).slice(-2);   
console.log('Criando Cache Carteira...'); 
 
req.query("INSERT INTO Log_ETL (data, tabela, msg) values('" + datetime + "','DW_FATOPRODUCAO','Foram importados " + i + " dados com sucesso!') ");
console.log('Process Done...'); 
conn.close();
}); 


/////////////////Close Connection
 
        doRelease(connection); 
        
   });  
});  
