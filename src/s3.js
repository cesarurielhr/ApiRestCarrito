require('dotenv').config();
const { S3Client, PutObjectCommand, ListObjectsCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_PUBLIC_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});

async function uploadFile(file) {
    const stream = fs.createReadStream(file.tempFilePath); // Si usas useTempFiles
    // O usa directamente file.data si no usas tempFilePath
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.name,
        Body: stream
    };
    const command = new PutObjectCommand(uploadParams);
    return await client.send(command);
}
//Mostrar todo los archvios objeyos 
async function getFiles() {
    const command = new ListObjectsCommand({
        Bucket: process.env.AWS_BUCKET_NAME
    })
    return await client.send(command)
}

/*async function getFile(filename) {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename
    })
    return await client.send(command)
}
*/
// Exportar funciones usando CommonJS
module.exports = { uploadFile,getFiles };

/*

export async function downloadFile(filename) {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename
    })
    const result = await client.send(command)
    console.log(result)
    result.Body.pipe(fs.createWriteStream(`./images/${filename}`))
}

export async function getFileURL(filename) {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: filename
    })
    return await getSignedUrl(client, command, { expiresIn: 3600 })
}*/