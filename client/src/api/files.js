import axios from 'axios'

const downloadDocument = async (filename) =>
{
    let resp = await axios({
        method: "get",
        responseType: 'blob',
        url: `http://localhost:5000/api/files/download/${filename}`
    });
    return resp;
}

const uploadDocument = async (id, filename, file) =>
{
    const formData = new FormData();
    formData.append(filename, file);
    let resp = await axios.post(`http://localhost:5000/api/files/upload/${id}`,formData);
    return resp;
}

export default { uploadDocument, downloadDocument }