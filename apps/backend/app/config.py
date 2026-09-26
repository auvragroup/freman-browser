from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

MONGO_URI = 'mongodb://localhost:27017'
DB_NAME = 'freman'

USER_COLLECTION = 'users'
BOOKMARKS_COLLECTION = 'bookmarks'
HISTORY_COLLECTION = 'history'
SETTINGS_COLLECTION = 'settings'
