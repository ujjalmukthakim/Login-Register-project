from django.core.mail import send_mail
#i import send mail to send mail and email's everything is set up in settings.py

#i need to access email host that's why i import setting
from django.conf import settings

def send_otp_email(email, otp):
    send_mail(
        "Your Verification OTP",
        #here otp is a object which include  user=user,code=code, purpose=purpose, expires_at=expiry
         f"Your OTP is {otp.code}",

        #this line is telling who is sending the mail
        settings.EMAIL_HOST_USER,
        #this line tells where to send i the mail
        [email],
    )

def send_activation_link(email, link):
    send_mail(
        "Activate Your Account",
        f"Click the link to activate: {link}",
        settings.EMAIL_HOST_USER,
        [email],
    )
#same case in here , i need method to send mail and activation link and that's why i create a file to write that method instead of writing the method in views