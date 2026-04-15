
# Lab 01: Machine Learning Applications for Promoting Vietnam Tourism
## Project: Restaurant Sentiment Analysis & Recommendation System in District 5, HCMC

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/chichic21039/ML-Lab1-Restaurant)
[![Google Drive](https://img.shields.io/badge/Google%20Drive-Large%20Files-orange?logo=googledrive)](https://drive.google.com/drive/folders/1XnFV6FiIKa-IPg5H29sR0nA3oFXXQ1ey?usp=sharing)

This project aims to enhance the tourism experience in District 5, Ho Chi Minh City, by providing a sentiment-based restaurant recommendation system. Instead of relying solely on subjective star ratings, we utilize Machine Learning to analyze actual customer review content, providing more reliable and nuanced insights for tourists.

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

## 2. Important: Large Files & Assets

Due to GitHub's file size limits, the core datasets and the web application source code are hosted on Google Drive. **Please download these folders to run the project locally:**

👉 **[Download Dataset & Web App (Google Drive)](https://drive.google.com/drive/folders/1XnFV6FiIKa-IPg5H29sR0nA3oFXXQ1ey?usp=sharing)**

*   **`dataset/`**: Contains raw and processed JSON/CSV files.
*   **`food-recommend-sys/`**: Contains the full-stack source code (Next.js & Express).

---

## 3. Project Structure

The repository is organized into specific modules. Note that folders marked with `(Drive)` are found in the link above:

```text
├── dataset/ (Drive)           # Raw and processed datasets (too large for GitHub)
├── food-recommend-sys/ (Drive)# Full-stack Web Application source code
├── crawl_metadata/            # Selenium scripts for scraping restaurant info
├── crawl_review/              # Selenium scripts for scraping Google Maps reviews
├── preprocessing and eda/      # Data cleaning and Exploratory Data Analysis notebooks
├── model/                     # Training scripts for SVM, BiGRU, and PhoBERT
├── evaluation/                # Performance evaluation and confusion matrices
├── label/                     # Sentiment label definitions and mapping
├── requirements.txt           # Python dependencies (transformers, torch, pyvi, etc.)
└── README.md                  # Project documentation
```

---

## 4. Data & Preprocessing

### Data Sources
*   **Training Dataset:** ~32.7k Vietnamese reviews (Hugging Face & Kaggle).
*   **Real-world Data:** Web-scraped data from Google Maps for District 5 restaurants: **349 restaurants** and **8,369 reviews**.

### Preprocessing Pipeline
*   **Text Cleaning:** Unicode normalization and fixing Mojibake encoding errors.
*   **Standardization:** Correcting Vietnamese "teencode" (e.g., `ko` → `không`).
*   **Emoji Mapping:** Translating icons into descriptive Vietnamese words.
*   **Word Segmentation:** Using the `pyvi` library to handle Vietnamese compound words.
*   **Length Filtering:** Truncating reviews to a maximum of 256 tokens for model efficiency.

---

## 5. Model Implementation

We compared three distinct architectures:

1.  **SVM (Traditional ML):** Baseline model using **TF-IDF** vectorization.
2.  **BiGRU (Deep Learning):** Uses **FastText** embeddings to capture sequential context.
3.  **PhoBERT (Transformer):** SOTA model pre-trained on Vietnamese, fine-tuned for restaurant sentiment.

### Results Comparison

| Model | Accuracy | Macro F1 | Latency (ms/sample) |
| :--- | :---: | :---: | :---: |
| **SVM** | 0.826 | 0.801 | 17.989 |
| **BiGRU** | 0.834 | 0.803 | **2.049** |
| **PhoBERT** | **0.885** | **0.863** | 10.456 |

---

## 6. Application Development

The project is deployed as a full-stack solution:
*   **Stack:** Next.js (Frontend), Express.js (Backend), MongoDB Atlas (Database).
*   **Key Features:** 
    *   Search and filter restaurants by category, price, and LGBTQ+ friendliness.
    *   **Sentiment Dashboard:** Visual summaries (Charts) of customer sentiment for every restaurant.
    *   Offline inference pipeline to sync model predictions with the database.

---

## 7. Conclusions & Future Work

**Conclusion:** The project successfully demonstrates an end-to-end pipeline for Vietnamese sentiment analysis in tourism. PhoBERT is established as the superior model for quality, while BiGRU is optimal for efficiency.

**Future Directions:**
*   Scale data collection to cover all districts in Ho Chi Minh City.
*   Optimize PhoBERT via **Quantization** for mobile deployment.
*   Integrate **Multimodal Learning** (analyzing food images alongside text).

---
*Created for the Lab 01 assignment at HCMUS - April 2026.*