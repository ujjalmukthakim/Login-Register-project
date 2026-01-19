import random
from django.utils import timezone
from datetime import timedelta
from .models import OTP


#here i am just creating random otp and then i will receive it from the view by calling the method and then i will send the otp through email
def generate_otp(user, purpose="email_verification"):
    code = str(random.randint(100000, 999999))
    expiry = timezone.now() + timedelta(minutes=10)
     

    #here i am just creating an object named otp and put element in here like user ,code etc and then i can use it like otp.user / otp.expires_at
    otp = OTP.objects.create(
        user=user,
        code=code,
        purpose=purpose,
        expires_at=expiry
    )
    return otp


#that means if i need anything in view then i can create a file and put the messed up logic into that so that my view looks fresh