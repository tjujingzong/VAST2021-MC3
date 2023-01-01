import pandas as pd

df = pd.read_csv('total.csv', encoding='utf-8')
# 新添一个type列
df["tag"] = ""
# 如果message列中有@，则type为“chatter”
df.loc[df['message'].str.contains('@'), 'tag'] = 'chatter'
# 如果message中有满足正则表达式 *.*/*，则type为“junk”
df.loc[df['message'].str.contains(r'.*\..*/'), 'tag'] = 'advertisement'
# 如果author为KronosQuoth或Clevvah4Evah，则tag为“unrelated”
df.loc[df['author'].isin(['KronosQuoth', 'Clevvah4Evah']), 'tag'] = 'unrelated'
# 如果author为AbilaPost或megaMan,Homelandlllumination, KronosStar, CentralBulletin, NewsOnlineToday, InternationalNews,
# truccotrucco，则tag为“report”
df.loc[df['author'].isin(
    ['AbilaPost', 'megaMan', 'Homelandlllumination', 'KronosStar', 'CentralBulletin', 'NewsOnlineToday',
     'InternationalNews', 'truccotrucco']), 'tag'] = 'report'
# 剩余的tag为others
df.loc[df['tag'] == '', 'tag'] = 'others'
# 保存到csv文件
df.to_csv('total-type.csv', encoding='utf-8', index=False)
# 保存到json文件
df.to_json('total-type.json', orient='records', force_ascii=False)
