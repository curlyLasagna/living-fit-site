from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="templates")


facts = ["Loren Ipsum"]


@app.get("/", response_class=HTMLResponse)
def home(req: Request):
    return templates.TemplateResponse(
        {"request": req}, name="home.html", context={"facts": facts}
    )


@app.get("/locations", response_class=HTMLResponse)
def locations(req: Request):
    return
