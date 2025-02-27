const grid = require('gridfs-stream');
const mongoose = require('mongoose')

const url = 'http://localhost:5001';


let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
});

const uploadImage=(req,res)=>{
    if(!req.file){
        return res.status(404).json({msg:"file not found"})
    }
   
const imageurl = `${url}/file/${req.file.filename}`;
return res.status(200).json(imageurl)
}


const getImage= async (req,res)=>{
    try {   
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }

}



module.exports ={ uploadImage , getImage};