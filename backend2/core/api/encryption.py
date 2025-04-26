from cryptography.fernet import Fernet
from django.conf import settings

cipher = Fernet(settings.FERNET_SECRET)

def encrypt_data(data):
    return cipher.encrypt(data.encode()).decode()

def decrypt_data(data):
    return cipher.decrypt(data.encode()).decode()
