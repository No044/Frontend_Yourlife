import axios from 'axios';

export const UploadImg = async(file) =>{
    const data = new FormData();
        data.append('file', file);
        data.append('upload_preset', 'my_preset'); 
        try {
            const res = await axios.post(
                "https://api.cloudinary.com/v1_1/dkbvldq5r/image/upload", 
                data
            );
            return res.data.secure_url;
        } catch (err) {
            console.error(err);
            return null;
        }
}

export const Uploadlist = async(filelist)=>{
    const urls = await Promise.all(
        filelist.map(async (item) => {
            const file = item.originFileObj; 
            const url = await UploadImg(file); 
            return url;
        })
    );
    return urls
}