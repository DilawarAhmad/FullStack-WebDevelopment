from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Task
from .serializers import TaskSerializer
from rest_framework.response import Response

# Create your views here

@api_view(['GET'])
def task_list(request):
    tasks=Task.objects.all().order_by('-id')
    serializer=TaskSerializer(tasks,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def add_task(request):
    serializer=TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
    
@api_view(['GET'])
def detail_task(request,pk):
    task=Task.objects.get(id=pk)
    serializer=TaskSerializer(task,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def update_task(request,pk):
    task=Task.objects.get(id=pk)
    serializer=TaskSerializer(instance=task,data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def delete_task(request,pk):
    task=Task.objects.get(id=pk)
    task.delete()
    return Response("item deleted succesfully")