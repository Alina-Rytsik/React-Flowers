from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from rest_framework.routers import DefaultRouter 

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from products.views import ProductViewSet, CategoryViewSet, OrderViewSet, RegisterView, ProfileView, CardViewSet, FavoriteViewSet

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

# Настройка Swagger
schema_view = get_schema_view(
   openapi.Info(
      title="Flowers Shop API",
      default_version='v1',
      description="API documentation for the Flowers Shop project",
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

# Создаем роутер и регистрируем ViewSet-ы
router = DefaultRouter()
router.register(r'products', ProductViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'orders', OrderViewSet)
router.register(r'cards', CardViewSet, basename='cards')
router.register(r'favorites', FavoriteViewSet, basename='favorites')

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Все маршруты из роутера (products, categories, orders) 
    path('api/', include(router.urls)), 
    
    # Авторизация
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Для обновления токена
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # Это для логина
    
    # Документация
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    
    # Товары (ProductViewSet и т.д.)
    path('api/profile/', ProfileView.as_view(), name='profile'),
]

# Важно для картинок! Чтобы React видел изображения из папки media
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
