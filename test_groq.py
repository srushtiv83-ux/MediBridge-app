import os
from dotenv import load_dotenv
from groq import Groq

# Load API key
load_dotenv()

# Connect to Groq
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# Send a question to the AI
response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[
        {
            "role": "user",
            "content": "Explain what MediBridge is in two simple sentences."
        }
    ]
)

# Display AI response
print(response.choices[0].message.content)