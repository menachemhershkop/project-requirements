import cloudinary from ".";

export default function uploadCloudenary(image) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({
            public_id: "cloudinary-tutorial",
            resource_type: "image",
        },
            (error, result) => {
                if (error) {
                    reject(error)

                }
                else {
                    resolve(result)
                }
            }
        ).end(image);
    })

}