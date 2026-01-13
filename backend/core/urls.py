from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from rest_framework.routers import DefaultRouter 

from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from products.views import ProductViewSet, CategoryViewSet, OrderViewSet

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

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Все маршруты из роутера (products, categories, orders) 
    # теперь будут доступны по префиксу api/
    path('api/', include(router.urls)), 
    
    # Авторизация
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Документация
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

# Важно для картинок! Чтобы React видел изображения из папки media
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)