// Fetch a word definition from Free Dictionary API
export async function fetchDefinition(word) {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Word "${word}" not found.`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching definition:", error);
      throw error;
    }
  }

export async function fetchWordAsResource(word) {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      throw new Error(`Word "${word}" not found.`);
    }

    const data = await response.json();

    return {
      title: `Definition: ${data[0].word}`,
      description: data[0].meanings[0].definitions[0].definition
    };
  } catch (error) {
    console.error("Word not found:", error);
    return null;
  }
}
