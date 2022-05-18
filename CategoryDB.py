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

from sqlalchemy import create_engine


servicekey = "dLd9t9rfmv/AodxacX4Wg9gnSXwnrf9XU0Eqo8b48BEjHxSDizJ2TUsKuFcEng7Tv9cZxHRCc4rXxr5S69naaA==" #디코딩 인증키
url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/categoryCode'


row_list1 = [] # 행값
name_list1 = [] # 열이름값
value_list1 = [] #데이터값

temp_dict1={}

row_list2 = [] # 행값
name_list2 = [] # 열이름값
value_list2 = [] #데이터값

temp_dict2={}

for su in range(1, 6):

    string = 'A0'+str(su)
    print("1. ", su, string, "\n")

    params ={'serviceKey' : servicekey, 
            'numOfRows' : '20', 
            'pageNo' : '1', 
            'MobileOS' : 'ETC', 
            'MobileApp' : 'AppTest', 
            'contentTypeId' : '12',
            'cat1' : string}

    response = requests.get(url, params=params)

    content = response.text

    xml_obj = bs4.BeautifulSoup(content,'lxml-xml')
    rows = xml_obj.findAll('item')

    print("1-1. ", len(rows), "\n")
    for i in range(0, len(rows)):
            columns = rows[i].find_all()
        #첫째 행 데이터 수집
            for j in range(0,len(columns)):

                params2 ={'serviceKey' : servicekey, 
                'numOfRows' : '20', 
                'pageNo' : '1', 
                'MobileOS' : 'ETC', 
                'MobileApp' : 'AppTest', 
                'contentTypeId' : '12',
                'cat1' : string,
                'cat2' : columns[j].text
                }
                response2 = requests.get(url, params=params2)

                content2 = response2.text

                xml_obj2 = bs4.BeautifulSoup(content2,'lxml-xml')
                rows2 = xml_obj2.findAll('item')

                for x in range(0, len(rows2)):
                    columns2 = rows2[x].find_all()
                    temp_dict2['cat1'] = string
                    temp_dict2['cat2'] = columns[j].text
                   
                    for y in range(0,len(columns2)):
                        temp_dict2[columns2[y].name]=columns2[y].text #딕셔너리로 '태그:값'형태로 저장 
                        

                    row_list2.append(temp_dict2)
                    temp_dict2={}

df = pd.DataFrame(data=None, index=None, columns=None, dtype=None, copy=False)

for i in range(0, len(row_list2)):
    new_data = row_list2[i]

    try:
        df=df.append(new_data, ignore_index=True)
    except:
        pass


db_connection_str = 'mysql+pymysql://root:0000@127.0.0.1:3306/test'
db_connection = create_engine(db_connection_str)
conn = db_connection.connect()

df.to_sql(name='test', con=db_connection, if_exists='append',index=False)  


conn.close()
