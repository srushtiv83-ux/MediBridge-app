from tool_registry import execute_tool

result = execute_tool(
    "get_patient_preferences",
    {"patient_name": "Ramesh"}
)

print(result)