from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth.models import User
from rest_framework import viewsets,permissions
# from .models import ToDo
# from .serializers import ToDoSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .encryption import encrypt_data 
from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer

@api_view(['POST'])
def register_user(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response({
        "success": True,
        "message": "User data fetched successfully",
        "user": serializer.data
    })
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def home(request):
    user = request.user
    return Response({
        "success": True,
        "message": f"Welcome back, {user.username}!",
        "user": {
            "username": user.username,
            "email": user.email
        }
    }, status=200)

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims (optional)
        token['username'] = user.username
        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = TokenObtainPairSerializer

# Custom token response with user info
@api_view(['POST'])
def custom_login(request):
    username = request.data.get("username", "").strip()
    password = request.data.get("password", "")

    if not username or not password:
        return Response({'message': 'Username and password are required'}, status=status.HTTP_400_BAD_REQUEST)

    user = authenticate(username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        # Encrypt response fields
        encrypted_username = encrypt_data(user.username)
        encrypted_email = encrypt_data(user.email)

        return Response({
            'refresh': str(refresh),
            'token': access_token,
            'user': {
                'username': encrypted_username,
                'email': encrypted_email
            }
        }, status=status.HTTP_200_OK)

    return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
# class ToDoViewSet(viewsets.ModelViewSet):
#     queryset = ToDo.objects.all()
#     serializer_class = ToDoSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     # @api_view(['GET'])
#     def get_queryset(self):
#         # Each user only sees their own tasks
#         return ToDo.objects.filter(user=self.request.user)
    
#     #   @api_view(['GET'])
#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

@api_view(['POST'])
def logout_user(request):
    response = Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
    response.delete_cookie("access_token")
    return response

# Assign Task API
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def assign_task(request):
#     try:
#         task = ToDo.objects.get(id=request.data['task_id'])
#         user = User.objects.get(id=request.data['user_id'])
#         task.assigned_to = user
#         task.save()
#         return Response({"message": "Task assigned successfully!"}, status=status.HTTP_200_OK)
#     except ToDo.DoesNotExist:
#         return Response({"error": "Task not found"}, status=status.HTTP_404_NOT_FOUND)
#     except User.DoesNotExist:
#         return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    
 # Delete Task
# @api_view(['DELETE'])
# @permission_classes([IsAuthenticated])
# def delete_task(request, task_id):
#     try:
#         task = ToDo.objects.get(id=task_id, user=request.user)
#         task.delete()
#         return Response({"message": "Task deleted successfully!"}, status=status.HTTP_200_OK)
#     except ToDo.DoesNotExist:
#         return Response({"error": "Task not found or unauthorized"}, status=status.HTTP_404_NOT_FOUND)
    
# Manage Task
# @api_view(['PUT'])
# @permission_classes([IsAuthenticated])
# def manage_task(request, task_id):
#     try:
#         task = ToDo.objects.get(id=task_id, user=request.user)
#     except ToDo.DoesNotExist:
#         return Response({"error": "Task not found or unauthorized"}, status=status.HTTP_404_NOT_FOUND)

#     serializer = ToDoSerializer(task, data=request.data, partial=True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response({"message": "Task updated!", "task": serializer.data})
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
 
    

# views.py


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
