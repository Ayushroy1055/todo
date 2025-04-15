from rest_framework import serializers
from django.contrib.auth.models import User
# from .models import ToDo

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

# class ToDoSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ToDo
#         fields = '__all__'  # or list them individually
#         read_only_fields = ['id', 'created_at', 'updated_at']
        
class LogoutSerializer(serializers.Serializer):
    message = serializers.CharField(read_only=True)        