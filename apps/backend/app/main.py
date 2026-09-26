from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title='Freman API', version='0.1.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


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
                'url': 'https://example.com/freman-search',
                'snippet': 'Starter backend response and Brave/Bing/SerpAPI-ready proxy.'
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
                'url': 'https://example.com/freman-search',
                'snippet': 'Search API integration scaffold for Brave, Bing, or SerpAPI.'
            }
        ]
    }


@app.get('/wallet/overview')
def wallet_overview() -> dict:
    return {
        'connected': False,
        'network': 'Ethereum Mainnet',
        'address': None,
        'balance': None,
        'nfts': []
    }
