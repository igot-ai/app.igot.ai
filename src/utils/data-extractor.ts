export const extractJson = (content: string) => {
  try {
    /** Extracts valid JSON strings delimited by '`json' and '`' from raw text.
     *
     * @param content - The raw input text string.
     * @returns A parsed JSON object, or null if no valid JSON is found.
     */

    const jsonPattern = /`json\s*(.*?)\s*`/gs; // Regex pattern with flexible whitespace
    const matches = content.match(jsonPattern);

    if (!matches) return JSON.parse(content);

    let extractedJson: object | null = null;

    for (const match of matches) {
      try {
        const jsonData = match.slice(5, -1).trim(); // Remove pattern delimiters and extra whitespace
        extractedJson = JSON.parse(jsonData); // Validate as JSON
      } catch (e) {
        return null;
      }
    }

    return extractedJson;
  } catch (error) {
    return {};
  }
};
