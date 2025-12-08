import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL
console.log("baseURL", BASE_URL);
const client = axios.create({
    baseURL: BASE_URL,
    // timeout: 120000, // ۱۲۰ ثانیه تایم‌اوت چون هوش مصنوعی کند جواب میده
    // headers: { 'Content-Type': 'application/json' }
});

export const ai = {
    getOrCreateSession: async () => {
        const savedSession = localStorage.getItem("session");
        if (savedSession) return savedSession;

        const {data} = await client.post('/sessions');
        localStorage.setItem("session", data.session_id);
        return data.session_id;
    },
};