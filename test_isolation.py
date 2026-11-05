import os
from dotenv import load_dotenv
from hindsight_client import Hindsight

load_dotenv()

# Connect to Hindsight
client = Hindsight(
    base_url=os.getenv("HINDSIGHT_BASE_URL"),
    api_key=os.getenv("HINDSIGHT_API_KEY")
)

# Create separate memory banks
patients = {
    "Ramesh": "senior-ramesh",
    "Priya": "senior-priya",
    "Arun": "senior-arun"
}

# Store each patient's preference
patient_memories = {
    "Ramesh": "Ramesh prefers voice reminders for his medicines.",
    "Priya": "Priya prefers Kannada text reminders for her medicines.",
    "Arun": "Arun prefers simple English text reminders."
}

# Store memories separately
for patient, bank_id in patients.items():

    client.create_bank(
        bank_id=bank_id,
        name=f"MediBridge - {patient}"
    )

    client.retain(
        bank_id=bank_id,
        content=patient_memories[patient]
    )

    print(f"Memory stored for {patient}")


# Retrieve memories separately
print("\n------ PATIENT MEMORY TEST ------")

for patient, bank_id in patients.items():

    result = client.recall(
        bank_id=bank_id,
        query="What are this patient's reminder preferences?"
    )

    print(f"\n{patient}'s memory:")

    for memory in result.results:
        print(memory.text)


client.close()
#Memory isolation: proetcts one's data from mixing up with another person 
# Memory stored for Ramesh
# Memory stored for Priya
# Memory stored for Arun

# ------ PATIENT MEMORY TEST ------

# Ramesh's memory:
# Ramesh prefers voice reminders for his medicines.
# Ramesh prefers voice reminders for his medicines. | Involving: Ramesh

# Priya's memory:
# Priya prefers to receive medicine reminders in Kannada. | Involving: Priya
# Priya prefers to receive medicine reminders in Kannada.

# Arun's memory:
# Arun prefers receiving reminders in simple English text. | Involving: Arun
# Arun prefers receiving reminders in simple English text.