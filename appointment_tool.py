# Mock appointment data
appointments = {
    "Ramesh": "10 November 2026, 10:30 AM",
    "Priya": "12 November 2026, 2:00 PM",
    "Arun": "15 November 2026, 11:00 AM"
}


# Tool to retrieve the next appointment
def get_next_appointment(patient_name):

    if patient_name in appointments:
        return appointments[patient_name]

    return "No appointment found."


# Test the tool
result = get_next_appointment("Ramesh")#passing arguements 

print("Next appointment:", result)

from hindsight_client import Hindsight
from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Connect to Hindsight
hindsight = Hindsight(
    base_url=os.getenv("HINDSIGHT_BASE_URL"),
    api_key=os.getenv("HINDSIGHT_API_KEY")
)

BANK_ID = "medibridge-demo"
# Retrieve patient memories
memory = hindsight.recall(
    bank_id=BANK_ID,
    query= "How should Ramesh receive his medicine reminders?"
)

print("Patient Memory:")
print(memory)

# Mock appointment data
appointments = {
    "Ramesh": "10 November 2026, 10:30 AM",
    "Priya": "12 November 2026, 2:00 PM",
    "Arun": "15 November 2026, 11:00 AM"
}


# Our Python tool
def get_next_appointment(patient_name):
    if patient_name in appointments:
        return appointments[patient_name]

    return "No appointment found."


# Tell Groq which tool is available
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_next_appointment",
            "description": "Retrieve a patient's next appointment.",
            "parameters": {
                "type": "object",
                "properties": {
                    "patient_name": {
                        "type": "string",
                        "description": "Name of the patient"
                    }
                },
                "required": ["patient_name"]
            }
        }
    }
]


# Patient's question
question = "When is Ramesh's next appointment?"

# Send question and tool definition to Groq
response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[
        {
            "role": "user",
            "content": question
        }
    ],
    tools=tools,
    tool_choice="auto"
)

message = response.choices[0].message

# Check whether Groq wants to call our tool
if message.tool_calls:

    for tool_call in message.tool_calls:

        if tool_call.function.name == "get_next_appointment":

            arguments = json.loads(tool_call.function.arguments)

            result = get_next_appointment(**arguments)

            print("Tool executed!")
            print("Retrieved appointment:", result)

            # Send the tool result back to Groq
            final_response = client.chat.completions.create(
                model="openai/gpt-oss-120b",
                messages=[
    {
        "role": "system",
        "content": f"""
        You are MediBridge, a helpful medicine reminder assistant.

        Patient memories:
        {memory}

        Use these memories to personalize your response.
        Never invent medicine names, dosages or appointment details.
        """
    },
    {"role": "user", "content": question},
    message,
    {
        "role": "tool",
        "tool_call_id": tool_call.id,
        "content": result
    }
]
            )
            print("\nMediBridge AI:")
            print(final_response.choices[0].message.content)

else:
    print(message.content)

# Close Hindsight connection
hindsight.close()