import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

export default function Wishlist() {
  const [wishlistProducts, setWishlistProducts] = useState([]); // Initialize as an empty array
  const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage
  const [imgs] = useState(["images/camera.jpg"]); // Image array for demonstration
  const navigate = useNavigate(); // Create navigate function

  useEffect(() => {
    // Fetch wishlist products for the logged-in user
    fetch(`http://127.0.0.1:3000/api/getwishlist/${userId}`)
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setWishlistProducts(data); // Set the data if it's an array
        } else if (data.wishlist && Array.isArray(data.wishlist)) {
          setWishlistProducts(data.wishlist); // Handle case where data has a 'wishlist' field containing the array
        } else {
          setWishlistProducts([]); // If no array is returned, set an empty array
        }
      })
      .catch(error => {
        console.error('Error fetching wishlist:', error);
        setWishlistProducts([]); // Set an empty array in case of an error
      });
  }, [userId]);

  // Function to remove a product from the wishlist
  const handleRemove = (productId) => {
    alert('Remove Product Successfully');
    fetch(`http://127.0.0.1:3000/api/removewishlist/${userId}/${productId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Remove the product from the local state after successful deletion
          setWishlistProducts(prevProducts => prevProducts.filter(product => product._id !== productId));
        } else {
          console.error('Failed to remove product from wishlist');
        }
      })
      .catch(error => {
        console.error('Error removing product:', error);
      });
  };

  // Function to navigate back to the dashboard
  const handleBackToDashboard = () => {
    navigate('/dashboard'); // Navigate to the dashboard route
  };

  return (
    <div className="wishlist-container">
      <h2>My Wishlist</h2>
      <button 
        className="btn btn-success mt-4" 
        onClick={handleBackToDashboard} // Back to Dashboard button
      >
        Back to Dashboard
      </button>
      <div className="wishlist-products d-flex">
        {wishlistProducts.length > 0 ? ( // Check if products are available
          wishlistProducts.map((product, index) => (
            <div className='card mt-4 w-25 p-2' key={product?._id}>
              <img src={imgs[index % imgs.length]} className='card-img-top' height={200} alt={`Product ${index + 1}`} />
              <div>
                <div className='card-header'>{product?.pname || 'No product name'}</div>
                <div className='card-body'>{product?.des || 'No description available'}</div>
              </div>
              <div className='card-footer'>
                <button 
                  className='btn bg-primary text-white w-100' 
                  onClick={() => handleRemove(product._id)} // Remove product on click
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your wishlist is empty.</p> // Show this if no products in the wishlist
        )}
      </div>
     
    </div>
  );
}
