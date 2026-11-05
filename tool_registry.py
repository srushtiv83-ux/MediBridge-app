# MediBridge Tool Registry

# Tool 1
def get_next_appointment(patient_name):
    appointments = {
        "Ramesh": "10 November 2026, 10:30 AM",
        "Priya": "12 November 2026, 2:00 PM"
    }

    return appointments.get(patient_name, "No appointment found.")


# Tool 2
def get_patient_preferences(patient_name):
    preferences = {
        "Ramesh": "Voice reminders for evening medicines",
        "Priya": "Kannada language reminders"
    }

    return preferences.get(patient_name, "No preference found.")


# Central tool registry
tool_registry = {
    "get_next_appointment": get_next_appointment,
    "get_patient_preferences": get_patient_preferences
}


# Execute any registered tool
def execute_tool(tool_name, arguments):

    if tool_name not in tool_registry:
        return "Tool not available."

    selected_tool = tool_registry[tool_name]

    return selected_tool(**arguments)