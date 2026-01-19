from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import EmailTokenObtainPairSerializer


from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .tokens import generate_activation_token
from .tokens import verify_activation_token


from rest_framework import status
from django.urls import reverse
from django.conf import settings
from .serializers import RegisterSerializer
from .utils import generate_otp
from .emails import send_otp_email, send_activation_link
from rest_framework_simplejwt.tokens import RefreshToken


from django.utils import timezone
from .models import OTP, User

# from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import AllowAny



#i overwrite the model and serializer that's why i need to make a new view 
class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer



#this is for checking is authentication is working or not , is route protected or not
class ProtectedTestView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Authenticated!"})
    




class RegisterView(APIView):
    #register method is just for post that's why i just overwrite the post method
    def post(self, request):
        #i take the data into serializer varriable
        #here data=request.data means i am taking present user data
        serializer = RegisterSerializer(data=request.data)

        #i am checking serializer is valid or not
        serializer.is_valid(raise_exception=True)

        #in this line i save the serializer as well as i store data that i need into user and activation type that i returned from serializer
        user, activation_type = serializer.save()
      

        #i am checking the activation type
        if activation_type == "otp":

            #generate_otp is the method that i write utils.py , in there i write method to create otp
            #here otp is a object which which include otp.any one from them ->  (user=user,code=code, purpose=purpose, expires_at=expiry)
            #keep a eye on line 58 then you will find how here user came
            otp = generate_otp(user)

            #after having otp i send them to mail for sending mail with otp
            #it is the method i write in emails.py
            send_otp_email(user.email, otp)
            

            #returning the response so that restapi can show this text
            return Response({

                
                "message": "OTP sent to email"
            }, status=status.HTTP_201_CREATED)

        # activation link
        # i am importing generate_activation_token that from token ,the features already django have so be chill in that case
        token = generate_activation_token(user)

        #after creating token i create a valid activation link and call send_activation_link method that i created in email.py
        activation_url = f"http://127.0.0.1:8000/api/activate/{token}/"
        send_activation_link(user.email, activation_url)

        return Response({
            "message": "Activation link sent to email"
        }, status=status.HTTP_201_CREATED)


  



class VerifyOTPView(APIView):
    def post(self, request):
        email = request.data.get("email")
        code = request.data.get("otp")

        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"error": "User not found"}, status=404)

        otp = OTP.objects.filter(
            user=user,
            code=code,
            is_used=False,
            expires_at__gte=timezone.now()
        ).first()

        if not otp:
            return Response({"error": "Invalid or expired OTP"}, status=400)

        otp.is_used = True
        otp.save()

        user.is_active = True
        user.is_verified = True
        user.save()

        return Response({"message": "Account activated"})
    




class ActivateAccountView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, token):
        user_id = verify_activation_token(token)

        if not user_id:
            return Response(
                {"error": "Invalid or expired link"},
                status=400
            )

        user = User.objects.filter(pk=user_id).first()
        if not user:
            return Response({"error": "User not found"}, status=404)

        user.is_active = True
        user.is_verified = True
        user.save()

        return Response({"message": "Account activated successfully"})
    
#type nul > README.md for creating readme file 