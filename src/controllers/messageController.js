// Import necessary models and other dependencies
import Message from '../models/messageSchema.js';

// Predefined responses for the AI
const predefinedResponses = {
  greetings: ['hi', 'hello'],
  farewells: ['bye', 'goodbye'],
  gemstones: {
    'diamonds': "Diamonds are a girl's best friend! They are timeless and elegant.",
    'gold jewelry': "Gold jewelry is classic and versatile. It never goes out of style.",
    'silver': "Silver jewelry is a great choice for those who love a more understated look."
  }
};

// Function to generate AI responses based on user input
const generateAIResponse = (userInput) => {
  // Normalize user input for case insensitivity
  userInput = userInput.toLowerCase();

  // Check for greetings
  if (predefinedResponses.greetings.includes(userInput)) {
    return "Hello! How can I help you today?";
  }

  // Check for farewells
  if (predefinedResponses.farewells.includes(userInput)) {
    return "Thank you for chatting! Have a great day!";
  }

  // Check for gemstone queries
  for (const [keyword, response] of Object.entries(predefinedResponses.gemstones)) {
    if (userInput.includes(keyword)) {
      return response;
    }
  }

  // Response for unrecognized input
  return "I'm not sure about that. Can you please specify?";
};

// Controller to create a message
// Controller to create a message
export const createMessage = async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the request body
    
    // Ensure the request body contains the message field
    if (!req.body || !req.body.message) {
      return res.status(400).json({ message: "Message content is required" });
    }
    
    const { message } = req.body; // Destructure 'message' instead of 'content'

    // Create user message
    const userMessage = new Message({
      sender: 'user',
      content: message // Use 'message' here
    });
    await userMessage.save();

    // Generate AI response
    let aiResponse = generateAIResponse(message.toLowerCase());

    // Create AI message
    const aiMessage = new Message({
      sender: 'ai',
      content: aiResponse
    });
    await aiMessage.save();

    // Return both messages in the response
    res.status(201).json({ userMessage, aiMessage }); // Respond with both messages
  } catch (error) {
    console.error("Error in createMessage:", error);
    // Return both messages in the response
res.status(201).json({ userMessage, aiMessage }); // Ensure this structure

  }
};

// Controller to get messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages:", error);
    res.status(400).json({ message: error.message });
  }
};
