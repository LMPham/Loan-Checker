from pydantic import BaseModel
from typing import Optional

class PredictLoanModel(BaseModel):
    amount: float
    