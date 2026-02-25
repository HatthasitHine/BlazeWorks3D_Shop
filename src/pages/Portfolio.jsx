import { Clock, Tag } from 'lucide-react';
import portfolioData from '../data/portfolioData';
import Footer from '../components/layout/Footer';

export default function Portfolio() {
    return (
        <div className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-b from-purple-50 via-white to-blue-50 relative z-10 flex flex-col justify-between">
            <div className="pt-16 pb-20 px-4 sm:px-8 w-full flex flex-col flex-1">
                <div className="w-full max-w-7xl mx-auto">

                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            ผลงานของเรา
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            รวมตัวอย่างชิ้นงาน 3D Print คุณภาพสูงจากเครื่องพิมพ์ของเรา พร้อมรายละเอียดเวลาและราคาอ้างอิงเบื้องต้น
                        </p>
                    </div>

                    {/* Portfolio Grid Layout: 1 col (mobile), 2 cols (tablet), 4 cols (desktop) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {portfolioData.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group border border-gray-100/80 hover:-translate-y-1"
                            >
                                {/* Image Top */}
                                <div className="relative aspect-[4/3] w-full overflow-hidden bg-gray-100">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.partName}
                                        loading="lazy"
                                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                    />
                                    {/* ID Badge overlay */}
                                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-bold tracking-wider">
                                        {item.id}
                                    </div>
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
            <Footer />
        </div>
    );
}
