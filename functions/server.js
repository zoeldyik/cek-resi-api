const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// import routes
const cek_resi = require('./routes/cek_resi');
const cek_ongkir = require('./routes/cek_ongkir');
const provinsi = require("./routes/provinsi");
const kota = require("./routes/kota");
const kecamatan = require("./routes/kecamatan");

// set route
app.use("/.netlify/functions/server/cekresi", cek_resi);
app.use("/.netlify/functions/server/ongkir", cek_ongkir);
app.use("/.netlify/functions/server/provinsi", provinsi);
app.use("/.netlify/functions/server/kota", kota);
app.use("/.netlify/functions/server/kecamatan", kecamatan);

app.get("/*", async (req, res)=>{
    res.json({
        message:'sepertinya kamu tersesat',
        list_endPoints: {
            cekresi : {
                endpoint: "/cekresi",
                type: "post",
                body: 'courier (jne, jnt, tiki, sicepat) & waybill'
            },
            cek_ongkir : {
                endpoint: "/ongkir",
                type: "post",
                body: 'courier, origin (id kota) , destination (id kecamatan), weight (satuan gram)'
            },
            get_provinsi:{
                endpoint:"/provinsi",
                type:"get"
            },
            get_kota:{
                endpoint:"/kota/:idProvinsi",
                type:"get"
            },
            get_kecamatan:{
                endpoint:"/kota/:idKota",
                type:"get"
            },
        }
    })
})

module.exports.handler = serverless(app);