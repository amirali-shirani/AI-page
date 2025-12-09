import {axiosClient} from "../../../lib/axiosClient.js";

export const chatServices = {
    getOrCreateSession: async () => {
        const savedSession = localStorage.getItem("session");
        if (savedSession) return savedSession;

        const {data} = await axiosClient.post('/sessions');
        localStorage.setItem("session", data.session_id);
        return data.session_id;
    },

    sendMessage: async (message) => {
        const savedSession = localStorage.getItem("session");
        if (savedSession) {
            const {data} =  await axiosClient.post("/query", {
                category: "distribution",
                question: message,
                session_id: savedSession,
            })
            return data;
        }
    }
};