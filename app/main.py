from fastapi import FastAPI, Request, Form
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates

app = FastAPI()
templates = Jinja2Templates(directory="templates")


facts = ["Loren Ipsum"]
location_list = {
    "Hampstead": "2320 Hanover Pike, Suite 6 | Hampstead, MD 21074",
    "Glen Burnie": "7714 Ritchie Hwy. | Glen Burnie, MD 21061",
    "Middle River": "118 Carroll Island Rd. | Middle River, MD 21220",
}


@app.get("/", response_class=HTMLResponse)
def home(req: Request):
    return templates.TemplateResponse(
        request=req, name="home.html", context={"facts": facts}
    )


@app.get("/locations", response_class=HTMLResponse)
def locations(req: Request):
    return templates.TemplateResponse(
        request=req, name="locations.html", context={"locations": location_list}
    )


@app.get("/join", response_class=HTMLResponse)
def join(req: Request):
    return templates.TemplateResponse(request=req, name="join.html")
