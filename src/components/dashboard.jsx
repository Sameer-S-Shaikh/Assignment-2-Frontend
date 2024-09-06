import '../dashboard.css';
import { useState, useEffect } from 'react';
import Aside from './aside';
import { ProductCreationModal } from './ProductCreationModal';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const [imgs] = useState(["images/camera.jpg"]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedType, setSelectedType] = useState('ALL');
    const [sortOrder, setSortOrder] = useState('Ascending');
    const [showModal, setShowModal] = useState(false);
    const [wishlistProducts, setWishlistProducts] = useState([]); // State to store wishlist products
    const userId = localStorage.getItem("userId");  // Assuming userId is stored in localStorage after login
    const navigate = useNavigate();

    

    useEffect(() => {
        fetch('http://127.0.0.1:3000/api/products')
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    useEffect(() => {
        let filtered = selectedType === 'ALL' ? products : products.filter(product => product.type === selectedType);

        if (sortOrder === 'Ascending') {
            filtered.sort((a, b) => a.pname.localeCompare(b.pname));
        } else {
            filtered.sort((a, b) => b.pname.localeCompare(a.pname));
        }

        setFilteredProducts(filtered);
    }, [selectedType, products, sortOrder]);

    const handleCreateProduct = (newProduct) => {
        setProducts([...products, newProduct]);
        setFilteredProducts([...products, newProduct].filter(product => product.type === selectedType || selectedType === 'ALL'));
    };

    const handleDeleteProduct = (id) => {
        alert("you want to delete this product");
        fetch(`http://127.0.0.1:3000/api/product/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(response => {
            if (response.ok) {
                const updatedProducts = products.filter(product => product._id !== id);
                setProducts(updatedProducts);
                setFilteredProducts(updatedProducts.filter(product => product.type === selectedType || selectedType === 'ALL'));
            } else {
                return response.json().then(data => console.error('Delete error:', data.error));
            }
        })
        .catch(error => console.error('Error deleting product:', error));
    };

    const handleAddToWishlist = (productId) => {
        alert('Product Added Successfully');
        fetch('http://127.0.0.1:3000/api/wishlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, productId })
        })
        
        .then(response => response.json())
        .then(data => {
            console.log('Added to wishlist:', data);
            console.log({userId, productId });
        })
        .catch(error => console.error('Error adding to wishlist:', error));
    };
    
    // const fetchWishlist = () => {
    //     fetch(`http://127.0.0.1:3000/api/getwishlist/${userId}`)
    //         .then((response) => response.json())
    //         .then((data) => {
    //             setWishlistProducts(data.wishlist);
    //             setFilteredProducts(data.wishlist); // Set filtered products as wishlist
    //         })
    //         .catch((error) => console.error('Error fetching wishlist:', error));
    // };

    return (
        <div className="container-fluid">
            <header className='d-flex justify-content-between p-4'>
                <h3>KNOWLEDGE</h3>
                <div>
                    <button className='btn btn-primary create' onClick={() => setShowModal(true)}>CREATE PRODUCT</button>
                    <span className='bi bi-three-dots-vertical'></span>
                </div>
            </header>

            <div className='d-flex justify-content-between'>
                <nav className="nav">
                    <a className={`nav-link ${selectedType === 'ALL' ? 'active' : ''}`} href="#" onClick={() => setSelectedType('ALL')}>ALL</a>
                    <a className={`nav-link ${selectedType === 'live' ? 'active' : ''}`} href="#" onClick={() => setSelectedType('live')}>LIVE</a>
                    <a className={`nav-link ${selectedType === 'draft' ? 'active' : ''}`} href="#" onClick={() => setSelectedType('draft')}>DRAFT</a>
                    <a className={`nav-link ${selectedType === 'archived' ? 'active' : ''}`} href="#" onClick={() => setSelectedType('archived')}>ARCHIVED</a>
                    <a className="nav-link" href="#" onClick={() => navigate('/wishlist')}>WISHLIST</a> {/* Navigate to Wishlist */}
              
                </nav>
                <div>
                    <select className='form-select' value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                        <option value="Ascending">Ascending</option>
                        <option value="Descending">Descending</option>       
                    </select>
                </div>
            </div>
            
            <div className='row p-3 a'>
                <Aside></Aside>
                <main className='col-9 d-flex flex-wrap'>
                    {
                        filteredProducts.map((product, index) => (
                            <div className='card mt-4 w-25 p-2' key={product?._id}>
                                <img src={imgs[index % imgs.length]} className='card-img-top' height={200} alt={`Product ${index + 1}`} />
                                <div>
                                    <div className='card-header'>{product?.pname}</div>
                                    <div className='card-body'>{product?.des}</div>
                                </div>
                                <div className='card-footer'>
                                    <button className='btn btn-light button' onClick={() => handleAddToWishlist(product._id)}>Add Wishlist</button>
                                    <button className='btn bg-danger text-white' onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                </div>
                            </div>
                        ))
                    }
                </main>
            </div>

            <ProductCreationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onCreate={handleCreateProduct}
            />
        </div>
    );
}
