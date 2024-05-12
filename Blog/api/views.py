from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import user,post
from .serializers import userSerializer,postSerializer
# Create your views here.

@api_view(['GET'])
def postView(request):
    
    posts=post.objects.all().order_by('-id')
    serializer=postSerializer(posts,many=True)
    return Response(serializer.data)
    
    #if request.method=='POST':
        #serializer=postSerializer(data=request.data)
        #if serializer.is_valid():
            #serializer.save()
            #return Response(serializer.data)
        

@api_view(['GET'])
def userView(request):
    users=user.objects.all().order_by('-id')
    serializer=userSerializer(users,many=True)
    return Response(serializer.data)
    
    #if request.method=='POST':
        #serializer=userSerializer(data=request.data)
        #if serializer.is_valid():
            #serializer.save()
            #return Response(serializer.data)
