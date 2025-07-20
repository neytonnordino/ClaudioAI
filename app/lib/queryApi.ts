import openai from "./chatgpt";

const query = async (prompt: string, id: string, model: string) => {
  const res = await openai.chat.completions
    .create({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that responds with clarity and structure. Use headings, bullet points, bold text, and line breaks when helpful to make your answers easier to read.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.9,
      top_p: 1,
      max_tokens: 800,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    .then((res) => res.choices[0].message.content)
    .catch(
      (error) =>
        `Claudio was unable to find an answer fot that! (Error: ${error?.message})`
    );
  return res;
};

export default query;
