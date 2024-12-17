from django.http import JsonResponse
import requests
# Create your views here.
def index(request):
    api_key='12d63fc40cd70addc1d25c83a25a6b3b'
    city = request.GET.get('city' , 'New York')
    url=f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}'
    response = requests.get(url)
    print(url)
    data = response.json()
    return JsonResponse(data)