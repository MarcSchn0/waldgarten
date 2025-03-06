import React, { useEffect, useState } from "react";
import { ImagePlus, X, Upload, DollarSign, Pencil } from 'lucide-react';
import type { Product } from "~/types/interfaces";

interface UpdateProductFormProps {
    product: Product
    hostUrl: string
}

export default function UpdateProductForm({ product, hostUrl }: UpdateProductFormProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        if (!isOpen) {
            setSelectedImage(null);
        }
    }, [isOpen]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);

            const fileInput = document.getElementById('fullImage') as HTMLInputElement;
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInput.files = dataTransfer.files;
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
                <Pencil className="w-4 h-4" />
                Edit Product
            </button>

            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                 style={{ display: isOpen ? 'flex' : 'none' }}>
                <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 overflow-hidden shadow-xl">
                    <div className="flex justify-between items-center px-6 py-4 border-b">
                        <h2 className="text-xl font-semibold text-gray-900">Update Product</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <form
                        method="post"
                        encType="multipart/form-data"
                        onSubmit={() => setIsOpen(false)}
                        className="p-6"
                    >
                        <input type="hidden" name="formAction" value="update" />
                        <input type="hidden" name="productId" value={product.id} />
                        <input type="hidden" name="oldImageUrl" value={product.imageUrl} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <div
                                    className={`relative border-2 border-dashed rounded-lg transition-colors ${
                                        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                                    }`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type="file"
                                        id="fullImage"
                                        name="fullImage"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />

                                    <div className="relative aspect-video">
                                        <img
                                            src={selectedImage || `${hostUrl}/imgs/${product.imageUrl}`}
                                            alt={product.name}
                                            className="w-full h-full object-contain"
                                        />
                                        {selectedImage && (
                                            <button
                                                type="button"
                                                onClick={() => setSelectedImage(null)}
                                                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity group">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                                                <ImagePlus className="mx-auto h-8 w-8 mb-2" />
                                                <p className="text-sm">Click or drag to replace image</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Product Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        defaultValue={product.name}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                        placeholder="Enter product name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                        Price
                                    </label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                        <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            step="0.01"
                                            defaultValue={product.price}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                            placeholder="0.00"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={5}
                                        defaultValue={product.description}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                                        placeholder="Enter product description"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                            >
                                <Upload className="w-4 h-4" />
                                Update Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

