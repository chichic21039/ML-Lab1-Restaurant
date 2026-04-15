# 🍽️ ML-Lab1-Restaurant: Sentiment Analysis & Food Recommendation System

A machine learning-powered restaurant review analysis and food recommendation system that combines sentiment analysis of Vietnamese restaurant reviews with a full-stack web application.

---

## 👥 Group Members

| Name | Role | Contributions |
|------|------|---------------|
| Chi Chi | Project Lead & Backend Developer | System architecture, API development, database management |
| Team Member 2 | ML Engineer | Model development, training, and evaluation |
| Team Member 3 | Frontend Developer | Web application design and UI/UX |
| Team Member 4 | Data Scientist | Data collection, preprocessing, and EDA |

---

## 📊 Data

### Data Sources
- **Restaurant Reviews**: Crawled from Vietnamese restaurant review platforms
- **Restaurant Metadata**: Restaurant information, location, cuisine type, ratings
- **User Feedback**: Review text and user sentiment expressions

### Dataset Structure
```
dataset/
├── raw/                          # Original crawled data
├── processed/                    # Cleaned and preprocessed data
└── train_test_split/            # Train/validation/test sets
```

### Data Statistics
- **Total Reviews**: [X] reviews
- **Languages**: Vietnamese, some foreign reviews
- **Review Distribution**:
  - Negative (0): [X]% 
  - Positive (1): [X]%
  - Neutral (2): [X]%
  - Foreign (3): [X]%

### Data Annotation Guidelines
Reviews are labeled using a 4-class sentiment classification system:
- **Negative (0)**: Complaints, criticisms, or poor experiences (food, price, service)
- **Positive (1)**: Clear praise, satisfaction, or recommendations to others
- **Neutral (2)**: Factual descriptions without clear sentiment, or balanced reviews
- **Foreign (3)**: Non-Vietnamese content

**Special Bias Prevention Rules:**
- Avoid assuming satisfaction just because customers keep visiting
- "Okay", "Average", "Edible" → Neutral, not Positive
- Detect sarcasm: "Hope the place closes soon" → Negative

---

## 🤖 Model

### Model Architecture

**Primary Model: Naive Bayes with TF-IDF**
- Feature Extraction: TF-IDF Vectorization
- Classifier: Multinomial Naive Bayes
- Purpose: Fast, interpretable sentiment classification

**Alternative Model: BiGRU (Bidirectional GRU)**
- Architecture: Embedding → BiGRU → Dense layers
- Purpose: Deep learning approach for potentially better accuracy
- Framework: TensorFlow/Keras

### Model Pipeline
```
Raw Text → Preprocessing → Tokenization → Vectorization → Classification → Output
```

### Key Features
- Vietnamese text tokenization with `underthesea` library
- Stop-word removal and normalization
- Handling of sarcasm and informal language patterns
- Support for multiple model architectures

---

## 🔧 Training

### Prerequisites
```bash
# Install Python dependencies
pip install -r requirements.txt

# For BiGRU model
pip install -r requirements_bigru.txt
```

### Project Structure
```
ML-Lab1-Restaurant/
├── crawl_metadata/              # Restaurant metadata crawling scripts
├── crawl_review/                # Review data crawling scripts
├── preprocessing and eda/       # Exploratory Data Analysis & cleaning
├── label/                       # Data annotation and labeling
├── dataset/                     # Processed datasets
├── model/                       # Trained model files & artifacts
├── evaluation/                  # Evaluation metrics and results
├── food-recommend-system/       # Full-stack web application
│   ├── frontend/               # Next.js React application
│   └── backend/                # Express.js API server
└── requirements.txt            # Python dependencies
```

### Training Process

1. **Data Preparation**
   ```bash
   python preprocessing\ and\ eda/prepare_data.py
   ```
   - Cleans raw reviews
   - Removes duplicates and invalid entries
   - Splits data: Train (70%) / Validation (15%) / Test (15%)

2. **Exploratory Data Analysis (EDA)**
   - Analyze review length distributions
   - Sentiment class balance
   - Common keywords and patterns

3. **Model Training**
   - Naive Bayes:
     ```bash
     python model/train_naive_bayes.py
     ```
   - BiGRU:
     ```bash
     python model/train_bigru.py
     ```

4. **Hyperparameter Tuning**
   - Grid search for optimal parameters
   - Cross-validation on training set

---

## 📈 Evaluation

### Metrics

| Metric | Definition | Performance |
|--------|-----------|-------------|
| Accuracy | Correct predictions / Total | [X]% |
| Precision | True Positives / (TP + FP) | [X]% |
| Recall | True Positives / (TP + FN) | [X]% |
| F1-Score | Harmonic mean of Precision & Recall | [X] |
| Confusion Matrix | Class-wise prediction breakdown | See below |

### Evaluation Results

**Naive Bayes Model**
```
                Precision    Recall  F1-Score   Support
        Negative       [X]%     [X]%      [X]      [X]
        Positive       [X]%     [X]%      [X]      [X]
         Neutral       [X]%     [X]%      [X]      [X]
        Foreign        [X]%     [X]%      [X]      [X]
    
       Accuracy                           [X]%     [X]
      Macro Avg        [X]%     [X]%      [X]      [X]
   Weighted Avg        [X]%     [X]%      [X]      [X]
```

**BiGRU Model**
```
                Precision    Recall  F1-Score   Support
        Negative       [X]%     [X]%      [X]      [X]
        Positive       [X]%     [X]%      [X]      [X]
         Neutral       [X]%     [X]%      [X]      [X]
        Foreign        [X]%     [X]%      [X]      [X]
    
       Accuracy                           [X]%     [X]
      Macro Avg        [X]%     [X]%      [X]      [X]
   Weighted Avg        [X]%     [X]%      [X]      [X]
```

### Key Findings
- Model performs best on [class name]
- Challenges with [class name] due to class imbalance
- Sarcasm detection remains a limitation

---

## 🌐 Application

### Full-Stack Web Application
A complete recommendation system with frontend and backend.

### Frontend (Next.js + React)
- **URL**: [https://ml-lab1-restaurant.vercel.app](https://ml-lab1-restaurant.vercel.app)
- **Tech Stack**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Features**:
  - Search restaurants by name or location
  - View sentiment analysis of reviews
  - Get personalized restaurant recommendations
  - Interactive sentiment distribution charts (Recharts)
  - Responsive UI with modern design

**Setup**:
```bash
cd food-recommend-system/frontend
npm install
npm run dev
# Visit http://localhost:3000
```

### Backend (Express + MongoDB)
- **Tech Stack**: Express.js 5, Node.js, MongoDB, Mongoose
- **API Endpoints**:
  - `GET /api/restaurants` - List all restaurants
  - `GET /api/restaurants/:id` - Get restaurant details
  - `GET /api/reviews/:restaurantId` - Get reviews for a restaurant
  - `POST /api/analyze` - Analyze review sentiment
  - `GET /api/recommendations` - Get personalized recommendations

**Setup**:
```bash
cd food-recommend-system/backend
npm install
npm run dev
# API runs on http://localhost:5000
```

### Environment Variables
Create `.env` files in both frontend and backend:

**Backend `.env`**:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development
```

**Frontend `.env.local`**:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Running the Application

**Development Mode**:
```bash
# Terminal 1: Backend
cd food-recommend-system/backend
npm run dev

# Terminal 2: Frontend
cd food-recommend-system/frontend
npm run dev
```

**Production Deployment**:
- Frontend deployed on Vercel
- Backend can be deployed on Heroku, Railway, or any Node.js hosting

---

## 📁 Key Files

| File/Directory | Description |
|---|---|
| `crawl_metadata/` | Scripts for scraping restaurant metadata |
| `crawl_review/` | Scripts for scraping restaurant reviews |
| `preprocessing and eda/` | Data cleaning and exploratory analysis notebooks |
| `label/` | Data annotation guidelines and labeling results |
| `model/` | Trained ML models and training scripts |
| `evaluation/` | Evaluation metrics and result analysis |
| `food-recommend-system/` | Full-stack web application source code |
| `requirements.txt` | Python ML dependencies |
| `requirements_bigru.txt` | Deep learning model dependencies |

---

## 🚀 Getting Started

### Quick Start
```bash
# 1. Clone repository
git clone https://github.com/chichic21039/ML-Lab1-Restaurant.git
cd ML-Lab1-Restaurant

# 2. Install Python dependencies
pip install -r requirements.txt

# 3. Run backend
cd food-recommend-system/backend
npm install
npm run dev

# 4. Run frontend (in another terminal)
cd food-recommend-system/frontend
npm install
npm run dev

# 5. Open browser
# Frontend: http://localhost:3000
# API: http://localhost:5000
```

---

## 📝 Usage Examples

### Sentiment Analysis API
```bash
curl -X POST http://localhost:5000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"review": "Quán rất ngon, nhân viên thân thiện!"}'
```

### Get Restaurant Recommendations
```bash
curl http://localhost:5000/api/recommendations?cuisine=pho&location=district1
```

---

## 🔍 Model Performance Comparison

| Model | Accuracy | F1-Score | Training Time | Inference Time |
|-------|----------|----------|----------------|-----------------|
| Naive Bayes + TF-IDF | [X]% | [X] | < 1 min | < 1ms |
| BiGRU | [X]% | [X] | ~30 min | ~10ms |

**Recommendation**: Use Naive Bayes for production due to speed and reasonable accuracy.

---

## 🐛 Known Issues & Limitations

- Sarcasm detection requires manual post-processing
- Foreign language reviews need pre-filtering
- Class imbalance (especially for Neutral class) affects performance
- BiGRU model may overfit on smaller datasets
- Vietnamese-specific slang and abbreviations not always recognized

---

## 🔮 Future Improvements

- [ ] Implement BERT-based Vietnamese language model for better accuracy
- [ ] Add multi-class aspect-based sentiment analysis (food, service, price separately)
- [ ] Build real-time review recommendation engine
- [ ] Integrate with Google Maps API for location-based features
- [ ] Add user authentication and personalized recommendations
- [ ] Implement A/B testing framework for model improvements

---

## 📚 References

- [Underthesea](https://github.com/undertheseanlp/underthesea) - Vietnamese NLP Library
- [Scikit-learn Documentation](https://scikit-learn.org/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---

## 📧 Contact & Support

For questions or contributions, please reach out to the team or open an issue on GitHub.

**Project Homepage**: [https://ml-lab1-restaurant.vercel.app](https://ml-lab1-restaurant.vercel.app)
**Repository**: [https://github.com/chichic21039/ML-Lab1-Restaurant](https://github.com/chichic21039/ML-Lab1-Restaurant)

---

**Last Updated**: April 15, 2026