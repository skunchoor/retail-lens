from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Retail-Lens API")

class PredictionRequest(BaseModel):
    image_url: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Retail-Lens API"}

@app.post("/predict")
def predict(request: PredictionRequest):
    # TODO: Call Azure Custom Vision endpoint
    # TODO: Update Cosmos DB with the new inventory status
    return {"status": "success", "prediction": "out-of-stock"}
