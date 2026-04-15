Here is the complete **README.md** file in English, structured logically and professionally based on your report and folder structure.

---

# Lab 01: Machine Learning Applications for Promoting Vietnam Tourism
## Project: Restaurant Sentiment Analysis & Recommendation System in District 5, HCMC

This project aims to enhance the tourism experience in District 5, Ho Chi Minh City, by providing a sentiment-based restaurant recommendation system. Instead of relying solely on subjective star ratings, we utilize Machine Learning to analyze actual customer review content to provide more reliable insights for tourists.

---

## 1. Team Introduction

**Course:** Introduction to Machine Learning  
**University:** Ho Chi Minh City University of Science (VNU-HCMUS)  
**Faculty:** Information Technology  

**Team Members:**
*   **Phạm Khánh Linh** (23127083)
*   **Võ Trung Hiếu** (23127190)
*   **Nguyễn Thành Lợi** (23127408)
*   **Lê Quốc Thiện** (23127481)
*   **Phạm Quang Thịnh** (23127485)

**Instructors:** TS. Bùi Tiến Lên, ThS. Lê Nhựt Nam, Võ Nhật Tân  

---

## 2. Project Structure

The repository is organized to follow the standard Machine Learning pipeline:

```text
├── crawl_metadata/            # Scrapers for restaurant info (name, address, avg rating...)
├── crawl_review/              # Scrapers for customer reviews from Google Maps
├── dataset/                   # Training and real-world datasets (.csv, .json)
├── preprocessing and eda/      # Data cleaning and Exploratory Data Analysis notebooks
├── model/                     # Implementation of SVM, BiGRU, and PhoBERT
├── evaluation/                # Performance metrics and Confusion Matrix visualization
├── food-recommend-sys/        # Full-stack Web Application (Next.js, Express, MongoDB)
├── label/                     # Sentiment label definitions (Positive, Negative, Neutral)
├── requirements.txt           # Python dependencies (transformers, torch, pyvi, etc.)
├── package.json               # Node.js dependencies for the Web App
└── README.md                  # Project documentation
```

---

## 3. Data & Preprocessing

### Data Sources
*   **Training Dataset:** ~32.7k Vietnamese restaurant reviews (compiled from Hugging Face and Kaggle).
*   **Real-world Data:** Web-scraped data from Google Maps for restaurants specifically in **District 5**, resulting in **349 restaurants** and **8,369 reviews**.

### Preprocessing Pipeline
To ensure high performance in Vietnamese NLP, we implemented the following steps:
*   **Text Cleaning:** Unicode normalization, fixing Mojibake errors, and removing hidden characters.
*   **Standardization:** Correcting Vietnamese "teencode" and abbreviations (e.g., `ko` → `không`).
*   **Emoji Mapping:** Mapping expressive icons to descriptive Vietnamese tokens to capture visual sentiment.
*   **Word Segmentation:** Utilizing the `pyvi` library to handle Vietnamese compound words.
*   **Length Filtering:** Truncating reviews to a maximum of 256 tokens for computational efficiency.

---

## 4. Model Implementation

We compared three distinct architectures representing the evolution of NLP:

1.  **SVM (Traditional ML):** Our baseline model using **TF-IDF** vectorization.
2.  **BiGRU (Deep Learning - RNN):** Uses **FastText** Vietnamese word embeddings to capture sequential dependencies.
3.  **PhoBERT (Transformer-based):** A State-of-the-Art (SOTA) model pre-trained on large-scale Vietnamese corpora, fine-tuned for this specific task.

### Training Strategy
*   **Data Split:** 80:10:10 (Train:Validation:Test) using **Stratified Sampling**.
*   **Class Imbalance:** Handled using **Class Weights** to penalize errors in minority classes (Negative and Neutral).
*   **Optimization:** AdamW optimizer, Early Stopping, and Step-wise evaluation.

---

## 5. Evaluation & Results

| Model | Accuracy | Macro F1 | Latency (ms/sample) | Disk Size |
| :--- | :---: | :---: | :---: | :---: |
| **SVM** | 0.826 | 0.801 | 17.989 | **11.2 MB** |
| **BiGRU** | 0.834 | 0.803 | **2.049** | 52.8 MB |
| **PhoBERT** | **0.885** | **0.863** | 10.456 | 516.9 MB |

**Key Findings:**
*   **PhoBERT Superiority:** Significantly outperforms others in accuracy, especially for the difficult "Neutral" class.
*   **Inference Efficiency:** **BiGRU** is the most efficient for real-time applications with the lowest latency.
*   **Robustness:** PhoBERT maintains high accuracy (~85%) even on long-form reviews compared to SVM.

---

## 6. Application Development

The final product is a full-stack web application designed for tourists:
*   **Tech Stack:** Next.js (Frontend), Express.js (Backend), MongoDB Atlas (Database).
*   **Features:**
    *   Advanced filtering (Category, price range, opening hours).
    *   **Sentiment Visualization:** Summary charts of customer opinions (Positive vs. Negative vs. Neutral).
    *   Model-assisted ranking to prioritize high-quality dining experiences.

---

## 7. Conclusions & Future Work

**Conclusion:** The project successfully demonstrates a complete pipeline for Vietnamese restaurant sentiment analysis. Transformer-based models (PhoBERT) provide the best generalization for complex linguistic nuances like sarcasm in culinary reviews.

**Future Research:**
*   **Scalability:** Expanding the geographical scope to all districts in Ho Chi Minh City.
*   **Optimization:** Applying Model Quantization and Distillation to deploy on mobile devices.
*   **Multimodal Learning:** Integrating visual features from food images alongside textual reviews for richer insights.

---
*Developed for academic purposes at HCMUS.*