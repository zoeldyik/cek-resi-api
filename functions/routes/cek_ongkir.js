const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post("/", async (req, res)=>{
    try {
        const api_endPoint = "https://ruangapi.com/api/v1/shipping";
        const {courier, origin, destination, weight} = req.body;
        const data = {courier, origin, destination, weight};

        const headers = {
            authorization:'GrysUgm9PPbGjYyV57Rt3DlKG1wpi3vqLnD22tgP',
            "accept": "application/json",
            "content-type": "application/json",
        };

        const respon = await axios({
            method: "POST",
            url: api_endPoint,
            data,
            headers
        });

        let json = await respon.data.data;
        console.log(json);
        res.json(json);
    } catch (err) {
        console.log(err);
        res.json({statusCode:500, message:"internal server error"})
    }
})

module.exports = router;