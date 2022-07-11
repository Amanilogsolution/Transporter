import axios from 'axios';

export const fileUpload = async(data) =>{
    console.log('data',data)
    const url=`http://localhost:7000/api/fileUpload`;
    return axios.post(url,data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err)
    })
}

export const fileUploaddb = async(document) =>{
    console.log('document',document)
    const url=`http://localhost:7000/api/fileUploaddb`;
    return axios.post(url,{document})
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err)
    })
}