export const getHardModeWord = async () => {
  try {
    const api = `https://random-word-api.herokuapp.com/word?length=5`;
    const response = await fetch(api);

    if (response.ok) {
      const data = await response.json();
      let word = data[0].toUpperCase();
      return { word };
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    console.error("⚠️ Something went wrong");
    throw new Error("Failed to get word");
  }
};
