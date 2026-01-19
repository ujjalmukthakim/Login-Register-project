"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path




from rest_framework_simplejwt.views import (
    # TokenObtainPairView,
    TokenRefreshView,
)

from accounts.views import EmailTokenObtainPairView,ProtectedTestView


from accounts.views import RegisterView, VerifyOTPView, ActivateAccountView


urlpatterns = [
    path('admin/', admin.site.urls),

    # path('api/token/', TokenObtainPairView.as_view()),
    #simple jwt takes username by defult but here i create model as email instead of username. that's why i create new email view
    path('api/token/', EmailTokenObtainPairView.as_view()),

    path('api/test/', ProtectedTestView.as_view()),



    path('api/token/refresh/', TokenRefreshView.as_view()),


    path("api/register/", RegisterView.as_view()),
    path("api/verify-otp/", VerifyOTPView.as_view()),
    path("api/activate/<str:token>/", ActivateAccountView.as_view()),



    
]
