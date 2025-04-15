# from django.db import models
# from django.contrib.auth.models import User
# from django.utils import timezone
# from rest_framework.response import Response

# class ToDo(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')  # Assign task to a user
#     text = models.CharField(max_length=255)
#     description = models.TextField(blank=True)  # Optional detailed description
#     done = models.BooleanField(default=False)
#     due_date = models.DateField(null=True, blank=True)  # Optional due date
#     priority = models.CharField(
#         max_length=10,
#         choices=[('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High')],
#         default='Medium'
#     )
#     created_at = models.DateTimeField(auto_now_add=True)  # Set when created
#     updated_at = models.DateTimeField(auto_now=True)      # Update on save/edit

#     def get(self, request):
#         todos = request.user.todos.all()
#         data = [{"id": todo.id, "text": todo.text} for todo in todos]
#         return Response(data)
