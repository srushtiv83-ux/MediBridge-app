import os
from dotenv import load_dotenv
from hindsight_client import Hindsight

# Load API key from .env
load_dotenv()

# Connect to Hindsight
client = Hindsight(
    base_url=os.getenv("HINDSIGHT_BASE_URL"),
    api_key=os.getenv("HINDSIGHT_API_KEY")
)

# Create MediBridge memory bank
client.create_bank(
    bank_id="medibridge-demo",
    name="MediBridge AI Care Companion"
)

# Store a sample memory
client.retain(
    bank_id="medibridge-demo",
    content="Ramesh prefers voice reminders for his evening medicines."
)

print("Memory stored successfully!")

# Retrieve the memory
result = client.recall(
    bank_id="medibridge-demo",
    query="What are Ramesh's reminder preferences?"
)

print("\nWhat Hindsight remembers:")

for memory in result.results:
    print(memory.text)

client.close()