from django.contrib import admin
from django.urls import path, include
from accounts.views import CustomTokenObtainPairView    
from rest_framework_simplejwt.views import TokenRefreshView
    
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('accounts.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]
