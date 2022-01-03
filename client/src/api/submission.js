import axios from 'axios'

const getAllSubmissions = async () =>
{
    let resp = await axios.get("http://localhost:5000/api/submissions");
    return resp;
}


const getSubmissionById = async (id) =>
{
    let resp = await axios.get(`http://localhost:5000/api/submissions/${id}`);
    let alldata = resp.data;
    return alldata;   
}

const addSubmission = async (obj) =>
{
    let resp = await axios.post("http://localhost:5000/api/submissions", obj);
    return resp;   
}

const updateSubmission = async (obj, id) =>
{
    let resp = await axios.put(`http://localhost:5000/api/submissions/${id}`, obj);
    return resp;
}


// const deleteSubmission = async (id) =>
// {
//     let resp = await axios.delete(`http://localhost:5000/api/submissions/${id}`);
//     return resp;
// }

export default  { getAllSubmissions, getSubmissionById, addSubmission, updateSubmission }
