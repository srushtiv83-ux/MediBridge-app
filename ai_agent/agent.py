from groq import Groq
from dotenv import load_dotenv
import os

from ai_agent.memory import PatientMemory

load_dotenv()


class MediBridgeAgent:

    def __init__(self):

        # Connect Groq
        self.client = Groq(
            api_key=os.getenv("GROQ_API_KEY")
        )

        # Connect Hindsight
        self.memory = PatientMemory()

    def respond(self, question):

        # Retrieve patient memory
        patient_memory = self.memory.recall_memory(question)

        # Generate personalized response
        response = self.client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[
                {
                    "role": "system",
                    "content": f"""
                    You are MediBridge, a helpful healthcare assistant.

                    Patient memories:
                    {patient_memory}

                    Use relevant memories to personalize responses.
                    Never invent medication names or dosages.
                    """
                },
                {
                    "role": "user",
                    "content": question
                }
            ]
        )

        return response.choices[0].message.content