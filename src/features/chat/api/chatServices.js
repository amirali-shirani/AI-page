import {axiosClient} from "../../../lib/axiosClient.js";


export const chatServices = {
    getOrCreateSession: async () => {
        const currentSession = localStorage.getItem("session");
        if (currentSession) return currentSession;

        const {data} = await axiosClient.post('/sessions');
        localStorage.setItem("session", data.session_id);
        return data.session_id;
    },

    sendMessage: async (question, session_id) => {
        if (!session_id) {
            throw new Error("Session ID not found");
        }

        const {data} = await axiosClient.post("/query", {
            category: "distribution",
            question,
            session_id,
        });
        return {data};
    },

    getHistory: async (sessionId) => {
        if (!sessionId) return;
        const {data} = await axiosClient.get(`/sessions/${sessionId}/history`);
        return data;
    },

    deleteSession: async (sessionId) => {
        await axiosClient.delete(`/sessions/${sessionId}`);
    },
};