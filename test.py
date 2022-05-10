import requests

servicekey = "dLd9t9rfmv/AodxacX4Wg9gnSXwnrf9XU0Eqo8b48BEjHxSDizJ2TUsKuFcEng7Tv9cZxHRCc4rXxr5S69naaA==" #디코딩 인증키
url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/categoryCode?'
params ={'serviceKey' : servicekey, 
            'numOfRows' : '10', 
            'pageNo' : '1', 
            'MobileOS' : 'ETC', 
            'MobileApp' : 'AppTest', 
            'contentTypeId' : '12',
            'cat1' : 'A01'}

response = requests.get(url, params=params)
response.raise_for_status()

response.encoding='UTF-8'

html = response.text
print(html)
