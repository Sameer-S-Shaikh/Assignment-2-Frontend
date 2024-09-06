import { useState } from 'react';

export function ProductCreationModal({ show, onClose, onCreate }) {
    const [newProduct, setNewProduct] = useState({
        pname: '',
        des: '',
        type: ''
    }); 

    const handleCreateProduct = () => {
        
        fetch('http://127.0.0.1:3000/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then(response => response.json())
        .then(data => {
            onCreate(data); 
            onClose(); 
            setNewProduct({ pname: '', des: '', type: '' }); 
            alert("product Added Successfully...");
        })
        .catch(error => console.error('Error creating product:', error));
    };

    return (
        show && (
            <div className="modal" style={{ display: 'block' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create Product</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="pname" className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        id="pname"
                                        className="form-control"
                                        value={newProduct.pname}
                                        onChange={(e) => setNewProduct({ ...newProduct, pname: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="des" className="form-label">Description</label>
                                    <textarea
                                        id="des"
                                        className="form-control"
                                        value={newProduct.des}
                                        onChange={(e) => setNewProduct({ ...newProduct, des: e.target.value })}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="type" className="form-label">Type</label>
                                    <select
                                        id="type"
                                        className="form-select"
                                        value={newProduct.type}
                                        onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                                    >
                                        <option value="">Select Type</option>
                                        <option value="live">Live</option>
                                        <option value="draft">Draft</option>
                                        <option value="archived">Archived</option>
                                    </select>
                                </div>
                                <button type="button" className="btn btn-primary" onClick={handleCreateProduct}>Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}
