from groq import Groq
from hindsight_client import Hindsight
from dotenv import load_dotenv
import os

load_dotenv()

# Connect Groq
groq_client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# Connect Hindsight
hindsight = Hindsight(
    base_url=os.getenv("HINDSIGHT_BASE_URL"),
    api_key=os.getenv("HINDSIGHT_API_KEY")
)

# Retrieve Ramesh's memory
memory = hindsight.recall(
    bank_id="medibridge-demo",
    query="What are Ramesh's medicine reminder preferences?"
)

# Patient question
question = "How should Ramesh receive his medicine reminders?"

# Ask Groq using Hindsight memory
response = groq_client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[
        {
            "role": "system",
            "content": f"""
            You are MediBridge, a helpful assistant.

            Use the following patient memory:
            {memory}

            Personalize your answer using this memory.
            Do not invent medical information.
            """
        },
        {
            "role": "user",
            "content": question
        }
    ]
)

print("\nMediBridge AI:")
print(response.choices[0].message.content)

# Close Hindsight connection
hindsight.close()