from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from .encryptionutils import encrypt_response_data,encrypt_data  # Import the encryption function
from .models import Task
from .serializers import TaskSerializer, UserSerializer, RegisterSerializer
import base64
from django.http import JsonResponse


#  Utility to encrypt multiple fields
# def encrypt_fields(data, fields_to_encrypt):
#     encrypted_data = {}
#     for field in fields_to_encrypt:
#         value = data.get(field)
#         if value is not None:
#             encrypted_data[field] = encrypt_data(str(value))
#         else:
#             encrypted_data[field] = None
#     return encrypted_data


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class CreateTaskView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(created_by=request.user)
            # Specify which fields to encrypt
            fields_to_encrypt = ['title', 'description']
            encrypted_data = encrypt_response_data(serializer.data, fields_to_encrypt)
            return Response(encrypted_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_user(request):
    username = request.data.get("username", "").strip()
    password = request.data.get("password", "")
    phonenumber = request.data.get("phonenumber")

    if not username or not password:
        return Response({'message': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password, phonenumber=phonenumber)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        #  Encrypt user fields
        user_data = {
            "username": user.username,
            "email": user.email,
        }
        
        # Specify which fields to encrypt
        fields_to_encrypt = ['username', 'email']
        
        # Encrypt user data
        encrypted_user_data = encrypt_response_data(user_data, fields_to_encrypt)

        #  Encrypt tokens
        encrypted_refresh = encrypt_data(str(refresh))
        encrypted_access_token = encrypt_data(access_token)

        return Response({
            'refresh': encrypted_refresh,
            'token': encrypted_access_token,
            'user': encrypted_user_data
        }, status=status.HTTP_200_OK)

    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def home(request):
    user = request.user

    #  Encrypt user fields in home also
    user_data = {
        "username": user.username,
        "email": user.email,
    }

    # Specify which fields to encrypt
    fields_to_encrypt = ['username', 'email']

    encrypted_user_data = encrypt_data(user_data, fields_to_encrypt)

    return Response({
        "message": encrypt_data(f"Welcome back, {user.username}!"),
        "user": encrypted_user_data
    })


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def logout_user(request):
    response = Response({"message": encrypt_data("Logout successful")}, status=status.HTTP_200_OK)
    response.delete_cookie("refresh_token")
    return response
