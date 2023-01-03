import pandas as pd
import numpy as np

df = pd.read_csv('total-type.csv', encoding='utf-8')
df['keyword'] = np.nan
df['message'] = df['message'].str.lower()
df['message'] = df['message'].str.split(' ')
word_idf = {}
for i in range(len(df['message'])):
    for word in df['message'][i]:
        if word in word_idf:
            word_idf[word] += 1
        else:
            word_idf[word] = 1
for word in word_idf:
    word_idf[word] = np.log(len(df['message']) / word_idf[word])
# 计算df中的Fields_of_Study中每个词的tf-idf值
word_tf_idf = {}
for i in range(len(df['message'])):
    for word in df['message'][i]:
        if word in word_tf_idf:
            word_tf_idf[word] += 1
        else:
            word_tf_idf[word] = 1
for word in word_tf_idf:
    word_tf_idf[word] = word_tf_idf[word] * word_idf[word]
word_tf_idf['rt'] = 0
word_tf_idf[''] = 0
word_tf_idf['to'] = 0
word_tf_idf['the'] = 0
word_tf_idf['of'] = 0
word_tf_idf['in'] = 0
word_tf_idf['a'] = 0
word_tf_idf['and'] = 0
word_tf_idf['for'] = 0
word_tf_idf['on'] = 0
word_tf_idf['is'] = 0
word_tf_idf['that'] = 0
word_tf_idf['by'] = 0
word_tf_idf['this'] = 0
word_tf_idf['with'] = 0
word_tf_idf['i'] = 0
word_tf_idf['it'] = 0
word_tf_idf['be'] = 0
word_tf_idf['are'] = 0
word_tf_idf['from'] = 0
word_tf_idf['at'] = 0
word_tf_idf['as'] = 0
word_tf_idf['was'] = 0
word_tf_idf['have'] = 0
word_tf_idf['or'] = 0
word_tf_idf['an'] = 0
word_tf_idf['not'] = 0
word_tf_idf['-'] = 0

# word_tf_idf中以#开头的词是无用词，需要删除
for word in word_tf_idf:
    if len(word) > 0 and (word[0] == '#' or word[0] == '@'):
        word_tf_idf[word] = 0
for i in range(len(df['message'])):
    max_tf_idf = 0
    for word in df['message'][i]:
        if word_tf_idf[word] > max_tf_idf:
            max_tf_idf = word_tf_idf[word]
            df['keyword'][i] = word
print(df['keyword'])
# 统计df中tag为others的数据中keyword的词频，并且排序
others = df[df['tag'] == 'others']
others = others['keyword'].value_counts()
others = others.sort_values(ascending=False)
print(others)
# 新建一个dataframe，用来存储统计结果 name为keyword，size为词频
others = pd.DataFrame({'name': others.index, 'size': others.values})
# 保存到json文件中
others.to_json('others.json', orient='records')

# 统计df中tag为report的数据中keyword的词频，并且排序
report = df[df['tag'] == 'report']
report = report['keyword'].value_counts()
report = report.sort_values(ascending=False)
print(report)
# 新建一个dataframe，用来存储统计结果 name为keyword，size为词频
report = pd.DataFrame({'name': report.index, 'size': report.values})
# 保存到json文件中
report.to_json('report.json', orient='records')

# 统计df中tag为advertisement的数据中keyword的词频，并且排序
advertisement = df[df['tag'] == 'advertisement']
advertisement = advertisement['keyword'].value_counts()
advertisement = advertisement.sort_values(ascending=False)
print(advertisement)
# 新建一个dataframe，用来存储统计结果 name为keyword，size为词频
advertisement = pd.DataFrame({'name': advertisement.index, 'size': advertisement.values})
# 保存到json文件中
advertisement.to_json('advertisement.json', orient='records')

# 统计df中tag为unrelated的数据中keyword的词频，并且排序
unrelated = df[df['tag'] == 'unrelated']
unrelated = unrelated['keyword'].value_counts()
unrelated = unrelated.sort_values(ascending=False)
print(unrelated)
# 新建一个dataframe，用来存储统计结果 name为keyword，size为词频
unrelated = pd.DataFrame({'name': unrelated.index, 'size': unrelated.values})
# 保存到json文件中
unrelated.to_json('unrelated.json', orient='records')

# 统计df中tag为chatter的数据中keyword的词频，并且排序
chatter = df[df['tag'] == 'chatter']
chatter = chatter['keyword'].value_counts()
chatter = chatter.sort_values(ascending=False)
print(chatter)
# 新建一个dataframe，用来存储统计结果 name为keyword，size为词频
chatter = pd.DataFrame({'name': chatter.index, 'size': chatter.values})
# 保存到json文件中
chatter.to_json('chatter.json', orient='records')

df.to_csv('total-type-keyword.csv', encoding='utf-8', index=False)
