import os
from dotenv import load_dotenv
from groq import Groq
from hindsight_client import Hindsight

# Load API keys
load_dotenv()

# Connect to Groq
groq_client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# Connect to Hindsight
memory_client = Hindsight(
    base_url=os.getenv("HINDSIGHT_BASE_URL"),
    api_key=os.getenv("HINDSIGHT_API_KEY")
)

# Patient names and their separate memory banks
patients = {
    "Ramesh": "senior-ramesh",
    "Priya": "senior-priya",
    "Arun": "senior-arun"
}

# Same question for all patients
question = "How should I receive my medicine reminders?"

# Process each patient
for patient, bank_id in patients.items():

    print(f"\n----- {patient.upper()} -----")

    # Retrieve this patient's memory
    result = memory_client.recall(
        bank_id=bank_id,
        query="What are this patient's medicine reminder preferences?"
    )

    # Extract memory
    memories = "\n".join(
        item.text for item in result.results
    )

    # Ask Groq using the retrieved memory
    response = groq_client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
            {
                "role": "system",
                "content": f"""
                You are MediBridge, a friendly healthcare companion.

                Patient: {patient}

                Remembered preferences:
                {memories}

                Personalize your answer using these preferences.
                Do not invent preferences if memory is unavailable.
                Never recommend changing prescribed medicine doses.
                """
            },
            {
                "role": "user",
                "content": question
            }
        ]
    )

    print(response.choices[0].message.content)

# Close connection
memory_client.close()