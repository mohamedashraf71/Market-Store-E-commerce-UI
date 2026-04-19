import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productRating, setProductRating] = useState(0);
  const [productRatingCount, setProductRatingCount] = useState(0);
  const [userProductRated, setUserProductRated] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [ratingMessage, setRatingMessage] = useState("");

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));

    // Load product rating from localStorage
    const savedRating = localStorage.getItem(`productRating_${id}`);
    const savedCount = localStorage.getItem(`productRatingCount_${id}`);
    const userRated = localStorage.getItem(`userProductRated_${id}`);

    if (savedRating) setProductRating(parseFloat(savedRating));
    if (savedCount) setProductRatingCount(parseInt(savedCount));
    if (userRated === 'true') setUserProductRated(true);
  }, [id]);

  const handleProductRating = (rating) => {
    if (userProductRated) return;

    const newCount = productRatingCount + 1;
    const newRating = ((productRating * productRatingCount) + rating) / newCount;

    setProductRating(newRating);
    setProductRatingCount(newCount);
    setUserProductRated(true);
    setUserRating(rating);

    // Save to localStorage
    localStorage.setItem(`productRating_${id}`, newRating.toString());
    localStorage.setItem(`productRatingCount_${id}`, newCount.toString());
    localStorage.setItem(`userProductRated_${id}`, 'true');

    // Set personalized message
    const messages = {
      1: "شكراً لتقييمك! سنعمل على تحسين جودة المنتج.",
      2: "نشكرك على تقييمك. سنأخذ ملاحظاتك في الاعتبار.",
      3: "شكراً لتقييمك! منتجنا يسعى دائماً للأفضل.",
      4: "نشكرك على تقييمك الجيد! يسعدنا رضاك.",
      5: "شكراً جزيلاً لتقييمك الممتاز! منتجنا فخور بك."
    };
    setRatingMessage(messages[rating]);
  };

  const renderStars = (rating, interactive = false, onRate = null) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`product-rating-star ${i < rating ? 'active' : ''}`}
        onClick={interactive ? () => onRate(i + 1) : null}
        style={{ cursor: interactive ? 'pointer' : 'default' }}
      >
        ★
      </span>
    ));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-details">
      <div className="product-details-header">
        <img src={product.image} alt={product.title} className="product-details-image" />
        <div className="product-details-info">
          <h1 className="product-details-title">{product.title}</h1>
          <p className="product-details-category">{product.category}</p>
          <div className="product-details-price">${product.price}</div>
          <p className="product-details-description">{product.description}</p>
        </div>
      </div>

      <div className="product-rating-section">
        <h3>تقييم المنتج</h3>
        <div className="product-rating-display">
          <div className="product-rating-stars">
            {renderStars(Math.round(productRating))}
          </div>
          <div className="product-rating-info">
            <span className="product-rating-average">{productRating.toFixed(1)}</span>
            <span className="product-rating-count">({productRatingCount} تقييم)</span>
          </div>
        </div>

        {!userProductRated ? (
          <div className="product-rating-input">
            <p>قيم هذا المنتج:</p>
            <div className="product-rating-stars interactive">
              {renderStars(0, true, handleProductRating)}
            </div>
          </div>
        ) : (
          <div className="product-rating-thanks">
            <p>شكراً لتقييمك! ⭐</p>
            <div className="user-rating-display">
              تقييمك: {renderStars(userRating)}
            </div>
            {ratingMessage && (
              <p className="rating-message">{ratingMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}