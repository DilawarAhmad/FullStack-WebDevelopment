
# Django Import 
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status

# Rest Framework Import
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated 
from rest_framework.response import Response

# Rest Framework JWT 
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# Local Import 
from api.models import *
from api.serializers import UserSerializer,UserSerializerWithToken





# JWT Views
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
       
        serializer = UserSerializerWithToken(self.user).data

        for k,v in serializer.items():
            data[k] =v

        return data
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['message'] = "Hello Aadil"
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    

# SHOP API
@api_view(['GET'])
def getRoutes(request):
    routes =[
        '/api/products/',
        '/api/products/<id>',
        '/api/users',
        '/api/users/register',
        '/api/users/login',
        '/api/users/profile',
    ]
    return Response(routes)


@api_view(['POST'])
def registerUser(request):
    data = request.data
    
    # Validate the presence of required fields
    required_fields = ['name', 'email', 'password']
    for field in required_fields:
        if field not in data:
            return Response(
                {"detail": f"Field '{field}' is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

    try:
        # Check if the user already exists
        
        if User.objects.filter(username=data['email']).exists():
            return Response(
                {"detail": "User with this email is already registered."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create the user
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            password=make_password(data['password']),
        )
        print("User created:", user)
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        

    except Exception as e:
        print("Error:", e)
        return Response(
            {"detail": "An error occurred during user registration."},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user =request.user 
    serializer = UserSerializer(user,many = False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user =request.user 
    serializer = UserSerializerWithToken(user,many = False)
    data = request.data
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    if data['password'] !="":
        user.password= make_password(data['password'])
    user.save()
    return Response(serializer.data)

 

 
@api_view(['DELETE'])
def deleteUser(request,pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    print("userdeleted")
    return Response("User was deleted")
