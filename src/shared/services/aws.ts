const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_REGION
const accessKey = process.env.AWS_ACCESS_KEY_ID
const secretKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new S3({
  region,
  accessKey,
  secretKey
})

/**
 * S3 file uploader funciton
 * @param {object} file Object received from multer
 * @returns {Promise}
 */
export const uploadFile = (file: any) => {
  const fileContent = fs.readFileSync(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileContent,
    Key: file.originalName
    //ContentType: file.mimetype
  }

  return s3.upload(uploadParams).promise()
}

/**
 * Returns the image/svg data from amazon
 * @param {string} fileKey - fileKey parameter got from amazon
 * @returns
 */
export const getFileStream = (fileKey: string) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }
  return s3.getObject(downloadParams).createReadStream()
}
