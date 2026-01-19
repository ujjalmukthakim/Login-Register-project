from django.core.signing import TimestampSigner, BadSignature, SignatureExpired

signer = TimestampSigner()

def generate_activation_token(user):
    return signer.sign(user.pk)

def verify_activation_token(token, max_age=3600):
    try:
        user_id = signer.unsign(token, max_age=max_age)
        return user_id
    except (BadSignature, SignatureExpired):
        return None
