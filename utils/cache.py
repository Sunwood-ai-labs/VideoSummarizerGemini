from functools import lru_cache

@lru_cache(maxsize=100)
def cache_get(key):
    return None

def cache_set(key, value):
    cache_get.cache_clear()
    cache_get(key)
    return value
