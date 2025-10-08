const API_URL = "https://mocki.io/v1/4e602db4-efab-438f-a664-bec50fc16f7e";

export const fetchTasks = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching tasks:", err);
    return { response: false, data: [] };
  }
};
