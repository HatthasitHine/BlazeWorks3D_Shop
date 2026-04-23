import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { Clock, Tag, Plus, X, Edit, Trash2, Box } from 'lucide-react';
import Footer from '../components/layout/Footer';
import { AuthContext } from '../context/AuthContext';

export default function Portfolio() {
    const { user } = useContext(AuthContext);
    const [items, setItems] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const fileInputRef = useRef(null);
    
    // New/Edit item form state
    const [formData, setFormData] = useState({
        partName: '',
        material: '',
        printTime: '',
        price: ''
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await axios.get('http://localhost:3001/api/portfolio');
            setItems(res.data);
        } catch (error) {
            console.error('Error fetching portfolio items', error);
        }
    };

    const handleOpenModal = (item = null) => {
        if (item) {
            setEditingId(item.id);
            setFormData({
                partName: item.partName,
                material: item.material || '',
                printTime: item.printTime,
                price: item.price
            });
        } else {
            setEditingId(null);
            setFormData({ partName: '', material: '', printTime: '', price: '' });
        }
        setImageFile(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผลงานนี้?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:3001/api/portfolio/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchItems();
            } catch (error) {
                console.error('Error deleting item', error);
                alert('เกิดข้อผิดพลาดในการลบผลงาน');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const headers = { 
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            };

            const submitData = new FormData();
            submitData.append('partName', formData.partName);
            submitData.append('material', formData.material);
            submitData.append('printTime', formData.printTime);
            submitData.append('price', formData.price);
            if (imageFile) {
                submitData.append('image', imageFile);
            }

            if (editingId) {
                await axios.put(`http://localhost:3001/api/portfolio/${editingId}`, submitData, { headers });
            } else {
                if (!imageFile) {
                    alert('กรุณาเลือกรูปภาพ');
                    return;
                }
                await axios.post('http://localhost:3001/api/portfolio', submitData, { headers });
            }

            setIsModalOpen(false);
            fetchItems();
        } catch (error) {
            console.error('Error saving portfolio item', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-b from-purple-50 via-white to-blue-50 relative z-10 flex flex-col justify-between">
            <div className="pt-16 pb-20 px-4 sm:px-8 w-full flex flex-col flex-1">
                <div className="w-full max-w-7xl mx-auto">

                    {/* Header Section */}
                    <div className="text-center mb-16 relative">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            ผลงานของเรา
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            รวมตัวอย่างชิ้นงาน 3D Print คุณภาพสูงจากเครื่องพิมพ์ของเรา พร้อมรายละเอียดเวลาและราคาอ้างอิงเบื้องต้น
                        </p>
                        
                        {/* Admin Add Button */}
                        {user?.role === 'ADMIN' && (
                            <div className="absolute top-0 right-0">
                                <button 
                                    onClick={() => handleOpenModal()}
                                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold transition-all shadow-md"
                                >
                                    <Plus size={20} /> เพิ่มสินค้า
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Portfolio Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100/80 hover:-translate-y-1 relative"
                            >
                                {/* Admin Edit/Delete Actions */}
                                {user?.role === 'ADMIN' && (
                                    <div className="absolute top-3 left-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleOpenModal(item)} className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition-colors">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                )}

                                {/* Image Top */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.partName}
                                        loading="lazy"
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* Material Badge overlay instead of ID */}
                                    {item.material && (
                                        <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-bold tracking-wider flex items-center gap-1">
                                            <Box size={12} /> {item.material.toUpperCase()}
                                        </div>
                                    )}
                                </div>

                                {/* Details Bottom */}
                                <div className="p-5 flex-1 flex flex-col justify-between">
                                    <div>
                                        <h3 className="font-black text-gray-900 text-lg mb-4 line-clamp-2 leading-tight">
                                            {item.partName}
                                        </h3>
                                    </div>

                                    <div className="space-y-2 mt-auto">
                                        <div className="flex items-center text-sm text-gray-500 bg-gray-50 p-2 rounded-lg">
                                            <Clock size={16} className="mr-2 text-[#72D1B7]" />
                                            <span className="font-medium">เวลาพิมพ์: {item.printTime}</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 bg-[#72D1B7]/10 p-2 rounded-lg">
                                            <Tag size={16} className="mr-2 text-[#72D1B7]" />
                                            <span className="font-bold text-[#5cb89e]">ราคาอ้างอิง: {item.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {items.length === 0 && (
                        <div className="text-center py-20 text-gray-500">
                            ไม่มีข้อมูลผลงาน
                        </div>
                    )}

                    {/* Bottom CTA */}
                    <div className="mt-16 text-center">
                        <p className="text-gray-600 mb-6">สนใจให้เราประเมินราคาชิ้นงานของคุณไหม?</p>
                        <a
                            href="https://m.me/IceBlazeLAB"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#72D1B7] hover:bg-[#5bb89e] text-white px-8 py-3.5 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                        >
                            สอบถาม/สั่งทำเลย
                        </a>
                    </div>

                </div>
            </div>
            
            {/* Add/Edit Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h2 className="text-2xl font-black text-gray-800">{editingId ? 'แก้ไขผลงาน' : 'เพิ่มสินค้าใหม่'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-red-500 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">ชื่อชิ้นงาน (Part Name)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.partName}
                                    onChange={(e) => setFormData({...formData, partName: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                    placeholder="เช่น โมเดลกันดั้ม ขนาด 1/144"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">ชนิดวัสดุ (Material)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.material}
                                    onChange={(e) => setFormData({...formData, material: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                    placeholder="เช่น PLA, PETG, ABS"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">เวลาพิมพ์ (Print Time)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.printTime}
                                    onChange={(e) => setFormData({...formData, printTime: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                    placeholder="เช่น 12h 30m"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">ราคาอ้างอิง (Price)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.price}
                                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                                    placeholder="เช่น 350 THB"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">ไฟล์รูปภาพ (Image)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                    ref={fileInputRef}
                                />
                                {editingId && !imageFile && <p className="text-xs text-gray-500 mt-1">* ไม่ต้องเลือกไฟล์ถ้าไม่ต้องการเปลี่ยนรูปภาพ</p>}
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-6 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                                >
                                    ยกเลิก
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-3 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
                                >
                                    {editingId ? 'บันทึกการแก้ไข' : 'เพิ่มสินค้า'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}
