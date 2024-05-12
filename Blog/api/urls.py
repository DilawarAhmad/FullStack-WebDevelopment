from django.urls import path
from . import views

urlpatterns = [
    path('posts',views.postView,name='posts'),
    path('users',views.userView,name='users')
]
