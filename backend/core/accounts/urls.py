from django.urls import path,include
from . import views
from rest_framework.routers import DefaultRouter
from .views import ToDoViewSet

router = DefaultRouter()
router.register(r'todos', ToDoViewSet)

urlpatterns = [
    path('register/', views.register_user),
    path('login/', views.custom_login),
    path('profile/', views.get_user),
    path('', include(router.urls)),
    path('logout/', views.logout_user),
]
