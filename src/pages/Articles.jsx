import { BookOpen, Calendar, Clock, ExternalLink } from 'lucide-react';
import articlesData from '../data/articlesData';
import Footer from '../components/layout/Footer';

export default function Articles() {
    return (
        <div className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-b from-blue-50 via-white to-emerald-50 relative z-10 flex flex-col justify-between">
            <div className="pt-16 pb-20 px-4 sm:px-8 w-full flex flex-col flex-1">
                <div className="w-full max-w-6xl mx-auto">

                    {/* Header Section */}
                    <div className="text-center mb-16 relative">
                        <div className="inline-flex items-center justify-center p-3 sm:p-4 bg-[#72D1B7]/10 text-[#72D1B7] rounded-2xl mb-6 shadow-sm">
                            <BookOpen size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                            บทความน่ารู้ <span className="text-[#72D1B7]">(Knowledge Base)</span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            รวบรวมเกร็ดความรู้ เทคนิคการพิมพ์ และการเลือกใช้วัสดุให้เหมาะสมกับชิ้นงานของคุณ
                        </p>
                    </div>

                    {/* Articles List / Grid */}
                    <div className="flex flex-col gap-10">
                        {articlesData.map((article, index) => {
                            // สลับฝั่งรูปภาพและข้อความสลับซ้ายขวา (Z-pattern) สำหรับจอใหญ่
                            const isEven = index % 2 !== 0;

                            return (
                                <article
                                    key={article.id}
                                    className={`bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col md:flex-row ${isEven ? 'md:flex-row-reverse' : ''} group`}
                                >
                                    {/* Image Side */}
                                    <div className="w-full md:w-5/12 aspect-video md:aspect-auto md:min-h-[350px] relative overflow-hidden bg-gray-100 shrink-0">
                                        <img
                                            src={article.imageUrl}
                                            alt={article.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="w-full md:w-7/12 p-8 md:p-10 flex flex-col justify-center">

                                        {/* Meta Tags */}
                                        <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-400 mb-4">
                                            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full"><Calendar size={14} /> {article.date}</span>
                                            <span className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full"><Clock size={14} /> {article.readTime}</span>
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-snug group-hover:text-[#72D1B7] transition-colors">
                                            {article.title}
                                        </h2>

                                        <p className="text-lg font-medium text-gray-700 mb-6 leading-relaxed border-l-4 border-[#72D1B7] pl-4">
                                            {article.summary}
                                        </p>

                                        {/* Content Preview (Bullet Points or Paragraphs) */}
                                        <div className="text-gray-500 text-base leading-relaxed mb-8 flex-1 space-y-2">
                                            {article.content.trim().split('\n').map((line, i) => {
                                                const parts = line.split(':');
                                                if (parts.length > 1) {
                                                    return (
                                                        <p key={i}>
                                                            <strong className="text-gray-700">{parts[0].trim()}:</strong> {parts[1].trim()}
                                                        </p>
                                                    );
                                                }
                                                return <p key={i}>{line}</p>;
                                            })}
                                        </div>

                                        {/* Footer / Source */}
                                        <div className="mt-auto pt-6 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                                            <span className="text-sm text-gray-400 flex items-center gap-2">
                                                <ExternalLink size={14} /> {article.sourceInfo}
                                            </span>
                                            <button className="text-[#72D1B7] font-bold text-sm hover:text-[#5bb89e] flex items-center gap-1 group/btn">
                                                อ่านเพิ่มเติม
                                                <span className="transform transition-transform group-hover/btn:translate-x-1">→</span>
                                            </button>
                                        </div>

                                    </div>
                                </article>
                            );
                        })}
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
}
