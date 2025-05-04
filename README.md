# Loan-Checker Setup Guide

## Prerequisites

- Python 3.10 or higher
- SQL Server (with SQL Server Management Studio recommended for database management)

---

## 1. Create and Activate Virtual Environment

### Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
```

## 2. Install Dependencies

Open an integrated terminal in the `app` directory and run the following command to install the dependencies

```bash
pip install -r requirements.txt
```

## 3. Configure Environment Variables

Configure a `.env.development` file in the `src/app/` directory to configure the JWT secret and algorithm

## 4. Set Up Database

Open SQL Server Management Studio (SSMS) or any SQL you have and create a database called `LoanChecker`

## 5. Run Alembic Migration

```bash
# Migrate to latest revison
alembic upgrade head

# Dowgragde to specific revision
alembic downgrade <revision_number>

# Downgrade to base (revert all revisions)
alembic downgrade base

# Create new revision
alembic revision -m <comment>
```

## 6. Run the Application

Run `uvicorn` web server from `app` directory (`reload` mode is for development purposes)

```bash
uvicorn main:app --reload
```

The API endpoints documentation can be accessed at `http://localhost:8000/docs`

## 7. Run the Client Application

Run `npm run start` from `client_app` directory to open the client application

The client application can be accessed at `http://localhost:3011/`
