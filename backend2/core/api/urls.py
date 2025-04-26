from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet,CreateTaskView, register_user, login_user, home, logout_user
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

router = DefaultRouter()
router.register('tasks', TaskViewSet , basename='task')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/tasks/create/', CreateTaskView.as_view(), name='create-task'),
    path('register/', register_user),
    path('login/', login_user),
    path('home/', home),
    path('logout/', logout_user),
]
