from groq import Groq
from tool_registry import execute_tool
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Mock patient data
appointments = {
    "Ramesh": "10 November 2026, 10:30 AM"
}

preferences = {
    "Ramesh": "Voice reminders for evening medicines"
}


# TOOL 1: Retrieve appointment
def get_next_appointment(patient_name):
    return appointments.get(patient_name, "No appointment found.")


# TOOL 2: Retrieve patient preference
def get_patient_preferences(patient_name):
    return preferences.get(patient_name, "No preference found.")


# Tell Groq about available tools
tools = [
    {
        "type": "function",
        "function": {
            "name": "get_next_appointment",
            "description": "Retrieve the patient's next appointment.",
            "parameters": {
                "type": "object",
                "properties": {
                    "patient_name": {"type": "string"}
                },
                "required": ["patient_name"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "get_patient_preferences",
            "description": "Retrieve the patient's reminder preferences.",
            "parameters": {
                "type": "object",
                "properties": {
                    "patient_name": {"type": "string"}
                },
                "required": ["patient_name"]
            }
        }
    }
]


# Patient question
question =  "When is Ramesh's next appointment?"

response = client.chat.completions.create(
    model="openai/gpt-oss-120b",
    messages=[
        {"role": "user", "content": question}
    ],
    tools=tools,
    tool_choice="auto"
)

message = response.choices[0].message

# Execute the tool selected by Groq
if message.tool_calls:

    tool_call = message.tool_calls[0]
    tool_name = tool_call.function.name

    arguments = json.loads(tool_call.function.arguments)

    result = execute_tool(tool_name, arguments)

    print("Selected tool:", tool_name)
    print("Retrieved information:", result)

    # Send result back to Groq
    final_response = client.chat.completions.create(
        model="openai/gpt-oss-120b",
        messages=[
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