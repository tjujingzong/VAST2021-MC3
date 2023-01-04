import pandas as pd
import numpy as np

df = pd.read_csv('total-type.csv', encoding='utf-8')
# 筛选出tag为others的所有author列
df = df[df['tag'] == 'others']['author']
# 获得每一位author出现的次数
df = df.value_counts()
# 将结果转换为dataframe 一列为author 一列为count
df = pd.DataFrame(df)
# 重命名列名
df.columns = ['count']
# 重置索引
df = df.reset_index()
# 重命名列名
df.columns = ['name', 'count']
print(df)
# 将结果保存为json文件
df.to_json('author-others.json', orient='records', force_ascii=False)

# 筛选出tag为unrelated的所有author列
df = pd.read_csv('total-type.csv', encoding='utf-8')
df = df[df['tag'] == 'unrelated']['author']
# 获得每一位author出现的次数
df = df.value_counts()
# 将结果转换为dataframe 一列为author 一列为count
df = pd.DataFrame(df)
# 重命名列名
df.columns = ['count']
# 重置索引
df = df.reset_index()
# 重命名列名
df.columns = ['name', 'count']
print(df)
# 将结果保存为json文件
df.to_json('author-unrelated.json', orient='records', force_ascii=False)

# 筛选出tag为report的所有author列
df = pd.read_csv('total-type.csv', encoding='utf-8')
df = df[df['tag'] == 'report']['author']
# 获得每一位author出现的次数
df = df.value_counts()
# 将结果转换为dataframe 一列为author 一列为count
df = pd.DataFrame(df)
# 重命名列名
df.columns = ['count']
# 重置索引
df = df.reset_index()
# 重命名列名
df.columns = ['name', 'count']
print(df)
# 将结果保存为json文件
df.to_json('author-report.json', orient='records', force_ascii=False)

# 筛选出tag为advertisement的所有author列
df = pd.read_csv('total-type.csv', encoding='utf-8')
df = df[df['tag'] == 'advertisement']['author']
# 获得每一位author出现的次数
df = df.value_counts()
# 将结果转换为dataframe 一列为author 一列为count
df = pd.DataFrame(df)
# 重命名列名
df.columns = ['count']
# 重置索引
df = df.reset_index()
# 重命名列名
df.columns = ['name', 'count']
print(df)
# 将结果保存为json文件
df.to_json('author-advertisement.json', orient='records', force_ascii=False)

# 筛选出tag为advertisement的所有author列
df = pd.read_csv('total-type.csv', encoding='utf-8')
df = df[df['tag'] == 'advertisement']['author']
# 获得每一位author出现的次数
df = df.value_counts()
# 将结果转换为dataframe 一列为author 一列为count
df = pd.DataFrame(df)
# 重命名列名
df.columns = ['count']
# 重置索引
df = df.reset_index()
# 重命名列名
df.columns = ['name', 'count']
print(df)
# 将结果保存为json文件
df.to_json('author-advertisement.json', orient='records', force_ascii=False)

# 筛选出tag为chatter的所有author列
df = pd.read_csv('total-type.csv', encoding='utf-8')
df = df[df['tag'] == 'chatter']['author']
# 获得每一位author出现的次数
df = df.value_counts()
# 将结果转换为dataframe 一列为author 一列为count
df = pd.DataFrame(df)
# 重命名列名
df.columns = ['count']
# 重置索引
df = df.reset_index()
# 重命名列名
df.columns = ['name', 'count']
print(df)
# 将结果保存为json文件
df.to_json('author-chatter.json', orient='records', force_ascii=False)
