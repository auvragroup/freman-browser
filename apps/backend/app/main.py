from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title='Freman API', version='0.1.0')


class SearchRequest(BaseModel):
    query: str
    provider: str = 'brave'


@app.get('/health')
def health() -> dict:
    return {'status': 'ok', 'service': 'freman-api'}


@app.get('/search')
def search(query: str = '', provider: str = 'brave') -> dict:
    return {
        'query': query,
        'provider': provider,
        'results': [
            {
                'title': 'Freman Search Ready',
                'url': 'https://freman.example',
                'snippet': 'Starter search response for the Freman browser platform.'
            }
        ]
    }


@app.post('/search')
def search_post(request: SearchRequest) -> dict:
    return {
        'query': request.query,
        'provider': request.provider,
        'results': [
            {
                'title': 'Freman Search Ready',
                'url': 'https://freman.example',
                'snippet': 'Backend proxy pattern is ready for Brave/Bing/SerpAPI integration.'
            }
        ]
    }
