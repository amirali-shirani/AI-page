import {axiosClient} from "../../../lib/axiosClient.js";

const savedSession = localStorage.getItem("session");
export const chatServices = {
    getOrCreateSession: async () => {

        if (savedSession) return savedSession;

        const {data} = await axiosClient.post('/sessions');
        localStorage.setItem("session", data.session_id);
        return data.session_id;
    },

    sendMessage: async (message) => {
        if (savedSession) {
            const {data} = await axiosClient.post("/query", {
                category: "distribution",
                question: message,
                session_id: savedSession,
            })
            return {data, savedSession};
        }
    },


    getHistory: async (sessionId) => {
        const {data} = await axiosClient.get(`/sessions/${sessionId}/history`);
        return data;
    }
};