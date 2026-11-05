from hindsight_client import Hindsight
from dotenv import load_dotenv
import os

load_dotenv()


class PatientMemory:

    def __init__(self):

        self.client = Hindsight(
            base_url=os.getenv("HINDSIGHT_BASE_URL"),
            api_key=os.getenv("HINDSIGHT_API_KEY")
        )

        self.bank_id = "medibridge-demo"

    def recall_memory(self, question):

        memory = self.client.recall(
            bank_id=self.bank_id,
            query=question
        )

        return memory

    def close(self):
        self.client.close()