import Message from "../models/messageSchema.js";

const predefinedResponses = {
  greetings: ["hi", "hello"],
  farewells: ["bye", "goodbye"],
  gemstones: {
    diamonds:
      "Diamonds are a girl's best friend! They are timeless and elegant.",
    "gold jewelry":
      "Gold jewelry is classic and versatile. It never goes out of style.",
    silver:
      "Silver jewelry is a great choice for those who love a more understated look.",
  },
};

const generateAIResponse = (userInput) => {
  userInput = userInput.toLowerCase();

  if (predefinedResponses.greetings.includes(userInput)) {
    return "Hello! How can I help you today?";
  }

  if (predefinedResponses.farewells.includes(userInput)) {
    return "Thank you for chatting! Have a great day!";
  }

  for (const [keyword, response] of Object.entries(
    predefinedResponses.gemstones
  )) {
    if (userInput.includes(keyword)) {
      return response;
    }
  }

  return "I'm not sure about that. Can you please specify?";
};

export const createMessage = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    if (!req.body || !req.body.message) {
      return res.status(400).json({ message: "Message content is required" });
    }

    const { message } = req.body; // Destructure 'message' instead of 'content'

    // Create user message
    const userMessage = new Message({
      sender: "user",
      content: message, // Use 'message' here
    });
    await userMessage.save();

    // Generate AI response
    let aiResponse = generateAIResponse(message.toLowerCase());

    // Create AI message
    const aiMessage = new Message({
      sender: "ai",
      content: aiResponse,
    });
    await aiMessage.save();

    res.status(201).json({ userMessage, aiMessage });
  } catch (error) {
    console.error("Error in createMessage:", error);

    res.status(201).json({ userMessage, aiMessage });
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error);
    res.status(400).json({ message: error.message });
  }
};
