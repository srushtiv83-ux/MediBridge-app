from ai_agent.agent import MediBridgeAgent

agent = MediBridgeAgent()

answer = agent.respond(
    "How should Ramesh receive his medicine reminders?"
)

print("\nMediBridge AI:")
print(answer)

agent.memory.close()