const express = require("express");
const router = express.Router();
const axios = require('axios');

router.get("/", async(req, res)=>{

    try {
        const headers = {
            authorization:'GrysUgm9PPbGjYyV57Rt3DlKG1wpi3vqLnD22tgP',
            "accept": "application/json",
        };

        const response = await axios.get(`https://ruangapi.com/api/v1/provinces`, {headers});
        const json = await response.data;
        const data = {
            statusCode:200,
            results:json.data.results
        };

        if(!data.results.length){
            data.statusCode = 400;
        }

        console.log(data);
        res.send(data);
    } catch (err) {
        console.log(err);
        res.json({statusCode:500, message:"internal server error"})
    }
 
})

module.exports = router;
