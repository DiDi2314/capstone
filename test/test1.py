#지역별 관광정보
# 모듈 import
import requests
import pprint
from os import name
import xml.etree.ElementTree as et
import pandas as pd
import bs4
from lxml import html
from urllib.parse import urlencode, quote_plus, unquote


servicekey = "dLd9t9rfmv/AodxacX4Wg9gnSXwnrf9XU0Eqo8b48BEjHxSDizJ2TUsKuFcEng7Tv9cZxHRCc4rXxr5S69naaA==" #디코딩 인증키
url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList?'

# 각 행의 컬럼, 이름, 값을 가지는 리스트 만들기
row_list = [] # 행값
name_list = [] # 열이름값
value_list = [] #데이터값

temp_dict={}

for i in range(1, 981):
    params ={'serviceKey' : servicekey, 
            'numOfRows' : '12', 
            'pageNo' : i, 
            'MobileOS' : 'ETC', 
            'MobileApp' : 'TourAPI3.0_Guide', 
            'contentTypeId' : '12',
            'cat1' : 'A01',
            'listYN' : 'Y',
            'arrange' : 'A'
            }

    response = requests.get(url, params=params)

    content = response.text

    print(i, "페이지")

    xml_obj = bs4.BeautifulSoup(content,'lxml-xml')
    rows = xml_obj.findAll('item')

    # xml 안의 데이터 수집
    for i in range(0, len(rows)):
        columns = rows[i].find_all()
    #첫째 행 데이터 수집
        for j in range(0,len(columns)):
            temp_dict[columns[j].name]=columns[j].text #딕셔너리로 '태그:값'형태로 저장 
        # 각 행의 value값 전체 저장
    
        row_list.append(temp_dict)
        temp_dict={}

df = pd.DataFrame(data=None, index=None, columns=None, dtype=None, copy=False)

for i in range(0, len(row_list)):
    new_data = row_list[i]
    df=df.append(new_data, ignore_index=True)
 
#df=df.iloc[:, [0, 1, 2, 3, 4, 5, 6, 7, 15, 17, 18]]

#DataFrame CSV 파일로 저장
df.to_csv('test.csv', index=False, encoding='utf-8-sig')