from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class ToDo(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='todos')  # Assign task to a user
    text = models.CharField(max_length=255)
    description = models.TextField(blank=True)  # Optional detailed description
    done = models.BooleanField(default=False)
    due_date = models.DateField(null=True, blank=True)  # Optional due date
    priority = models.CharField(
        max_length=10,
        choices=[('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High')],
        default='Medium'
    )
    created_at = models.DateTimeField(auto_now_add=True)  # Set when created
    updated_at = models.DateTimeField(auto_now=True)      # Update on save/edit

    def __str__(self):
        return f"{self.text} - {self.priority} - {'Done' if self.done else 'Pending'}"
