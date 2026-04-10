import pandas as pd

# Đọc file
df = pd.read_csv("dataset/preprocessed/reviews_final.csv", encoding='utf-8')

# Giữ lại cột review
df = df[['review']]

# Thêm cột review_id (bắt đầu từ 1)
df.insert(0, 'review_id', range(1, len(df) + 1))

# Lưu file
df.to_csv("reviews_with_id.csv", index=False, encoding='utf-8-sig')