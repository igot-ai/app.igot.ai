export const extractJson = (content: string): object | any => {
  try {
    /** Extracts valid JSON strings delimited by 'json' and '```' from raw text.
     *
     * @param content - The raw input text string.
     * @returns A parsed JSON object, or null if no valid JSON is found.
     */

    const jsonPattern = /```json\s*([\s\S]*?)\s*```/gs; // Regex pattern to match content between ```json and ```
    const matches = content.match(jsonPattern);

    if (!matches) return {};

    let extractedJson = {};

    for (const match of matches) {
      try {
        const jsonData = match.replace(/^```json\s*|```$/g, "").trim(); // Remove pattern delimiters and extra whitespace
        extractedJson = JSON.parse(jsonData); // Validate as JSON
      } catch (e) {
        return {};
      }
    }

    return extractedJson;
  } catch (error) {
    return {};
  }
};
