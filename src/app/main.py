"""Main Application"""

from fastapi import FastAPI

from routers import auth, company, user, project, group

app = FastAPI()

app.include_router(auth.router)
app.include_router(company.router)
app.include_router(user.router)
app.include_router(project.router)
app.include_router(group.router)

@app.get("/", tags=["Health Check"])
async def health_check():
    """
    Endpoint for checking the health status of the API service.

    Returns:
        str: A message indicating that the API service is up and running.

    """
    return "API Service is up and running!"