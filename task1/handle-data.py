# 读取csv-1700-1830.csv

import pandas as pd
import numpy as np

# 读取csv文件
df = pd.read_csv('csv-1700-1830.csv', encoding='utf-8')
df2 = pd.read_csv('csv-1831-2000.csv', encoding='ansi')
df3 = pd.read_csv('csv-2001-2131.csv', encoding='ansi')
# 拼接df,df2,df3
df = pd.concat([df, df2, df3], axis=0)
# 重置索引
df = df.reset_index(drop=True)
# date(yyyyMMddHHmmss)重命名为time
df.rename(columns={'date(yyyyMMddHHmmss)': 'time'}, inplace=True)
# date列转换为时间格式
df['time'] = pd.to_datetime(df['time'], format='%Y%m%d%H%M%S')
# time列仅保留时分秒
df['time'] = df['time'].dt.strftime('%H:%M:%S')
# 保存为csv文件
df.to_csv('total.csv', encoding='utf-8', index=False)
