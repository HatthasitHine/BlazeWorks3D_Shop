// นำเข้ารูปภาพจากโฟลเดอร์ Pic
import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';
import img3 from '../assets/images/3.jpg';
import img4 from '../assets/images/4.jpg';
import img5 from '../assets/images/5.jpg';
import img6 from '../assets/images/6.jpg';
import img7 from '../assets/images/7.jpg';
import img8 from '../assets/images/8.jpg';
import img9 from '../assets/images/17.jpg';
import img10 from '../assets/images/15.jpg';
import img11 from '../assets/images/19.jpg';
import img12 from '../assets/images/10.jpg';
import img13 from '../assets/images/11.jpg';
import img14 from '../assets/images/20.jpg';
import img15 from '../assets/images/18.jpg';
import img16 from '../assets/images/16.jpg';

// สร้าง Array รูปภาพเพื่อนำมาวนลูปใช้
const images = [
    img1, img2, img3, img4, img5, img6, img7, img8,
    img9, img10, img11, img12, img13, img14, img15, img16,
    img1, img2, img3, img4 // วนซ้ำให้ครบ 20 ชิ้น
];

const portfolioData = Array.from({ length: 20 }, (_, i) => ({
    id: `P-${String(i + 1).padStart(3, '0')}`,
    imageUrl: images[i],
    partName: `ชิ้นงาน 3D Part รุ่น ${i + 1}`,
    printTime: `${Math.floor(Math.random() * 20) + 1} ชั่วโมง ${Math.floor(Math.random() * 59)} นาที`,
    price: `${Math.floor(Math.random() * 2000) + 100} บาท`
}));

export default portfolioData;
