import pandas as pd

df = pd.read_csv('total.csv', encoding='utf-8')
# 读取message列 中以#开头的内容
df['tag'] = df['message'].str.findall(r'#(\w+)')
print(df['tag'])

tag_count = {}
for i in df['tag']:
    for j in i:
        if j in tag_count:
            tag_count[j] += 1
        else:
            tag_count[j] = 1

# 对tag_count从大到小排序
tag_count = sorted(tag_count.items(), key=lambda x: x[1], reverse=True)
print(tag_count)
# 将tag_count的前20个写入csv文件
pd.DataFrame(tag_count[:20]).to_csv('tag_count_top20.csv', encoding='utf-8', index=False)
