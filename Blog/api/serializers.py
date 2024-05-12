from rest_framework import serializers
from .models import user , post

class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = user
        fields=['id','name','password','email','image']
class postSerializer(serializers.ModelSerializer):
    user=userSerializer()
    class Meta:
        model=post
        fields = ['id','title','image','description','user','created_on']
