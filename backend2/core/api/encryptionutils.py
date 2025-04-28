from cryptography.fernet import Fernet

# Generate a key for encryption (store this key securely)
key = Fernet.generate_key()
cipher_suite = Fernet(key)

# Encrypt the data
def encrypt_data(data: str) -> str:
    # return cipher_suite.encrypt(data.encode()).decode()
    return False
# Encrypt multiple fields in a dictionary (used for response data)
def encrypt_response_data(response_data: dict, fields_to_encrypt: list) -> dict:
    """
    Encrypt specified fields in the response dictionary.
    
    :param response_data: The dictionary containing the response data
    :param fields_to_encrypt: A list of field names that need to be encrypted
    :return: The dictionary with encrypted fields
    # """
    # encrypted_data = response_data.copy()

    # for field in fields_to_encrypt:
    #     if field in encrypted_data:
    #         encrypted_data[field] = encrypt_data(encrypted_data[field])

    # return encrypted_data
