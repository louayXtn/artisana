import '../styles/aboutSection.css';
import sectionAboutImg from '../images/sectionAboutImg.jpeg';
export default function AboutSection() {
  return (
    <section id="about">
      <div className="about-container">
        <img className='about-img' src={sectionAboutImg} alt="من نحن" />
        <div className="about-text">
          {/* <h2>من نحن</h2> */}
          <div className='title-container'>
            <h1>من نحن</h1>
          </div>
          <p>
            نحن منصة تونسية متخصصة في عرض وبيع المنتجات التقليدية الأصيلة، التي تعكس جمال التراث والحرف اليدوية المحلية.
            من الفخار إلى النسيج، ومن الزيوت الطبيعية إلى  الحقائب التقليدية، نحرص على تقديم منتجات عالية الجودة من قلب الثقافة التونسية.
          </p>
          <p>
            هدفنا هو ربط الحرفيين المحليين بالأسواق الرقمية، وتمكين الزبائن من اكتشاف كنوز تونسية فريدة، بكل سهولة وثقة.
            نحن نؤمن بأن كل منتج يحمل قصة، وكل حرفة تستحق أن تُروى.
          </p>
        </div>
      </div>
    </section>
  );
}