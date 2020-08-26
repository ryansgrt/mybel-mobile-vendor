import axios from 'axios';

const client = axios.create({ baseURL: 'https://e274420a4d5c.ngrok.io' })
// const baseUrl = 'https://799eb8ec4556.ngrok.io/vendor/'

export async function getVendors() {
    console.log("masuk services")
    const { data: { content } } = await client.get('/vendor/list');
    return content;
}
export async function getSingleData(id) {
    const { data: { content } } = await client.get(`/vendor/${id}`);
    return content;
}
export async function saveVendor(form) {
    const { data } = await client.post('/vendor/', form);

    return data;
}

export async function updateVendor(vendor) {
    const { data } = await client.post(`/vendor/`, vendor);
    return data;
}

export async function deleteVendor(Id) {
    const response = await client.delete(`/vendor/${Id}`);
    if (response.status === 200) return true;
    else return false;
}

export async function login(user, password) {

    const { data } = await client.get(`/vendor/signin?identity=${user}&password=${password}`);
    alert("log in berhasil")
    return data;
}

export async function getUsername(keyword) {
    const { data } = await client.get(`/vendor/username/${keyword}`);
    console.log(data, "service")
    return data;
}
export async function getEmail(keyword) {
    const { data } = await client.get(`/vendor/email/${keyword}`);
    return data;
}

export async function getVendorId(id) {
    const { data } = await client.get(`/vendor/${id}`);
    console.log('SERVICE', data);

    return data;
}
