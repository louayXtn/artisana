import React from 'react'
import artisanBags from '../images/artisanBags.jpeg'
import artisanSculptor from '../images/artisanSculptor.jpeg'
import artisanSewing from '../images/artisanSewing.jpeg'
import '../styles/artisanStories.css'
import SmartImage from './SmartImage';
const artisanStories = () => {
  return (
    <>
    <section className='artisanStories'>
      <div className='title-container'>
        <h1>قصص الحرفيين</h1>
      </div>
      <h3>الحرف ما كانتش مجرد أدوات، كانت امتداد للروح. كل غرزة، كل ظفيرة، كل نقشة، فيها سرّ من أسرار تونس. الناس ما كانتش تشتري المنتج، كانت تشتري الحكاية اللي فيه.
 الحرفة أكثر من مجرد عمل. كانت لغة، تراث، وذاكرة. </h3>
      <div className='artisanStories-content'>
        <div className='artisan-story'>
            <SmartImage src={artisanBags} alt=" ظفر السعف" />
              <div className='theStory'>
                <h5>🌴 ظفر السعف:</h5><p>السعف اليابس، وقت يدخل يد الحرفي، يولي مضلة تردّ الشمس وسلّة تشيل الخير.  
كل ظفيرة فيها صبر، وكل شكل فيه هندسة من قلب النخلة.
</p>

              </div>
            
        </div>
        <div className='artisan-story'>
            <SmartImage src={artisanSewing} alt="التطريز" />
              <div className='theStory'><h5>🧵 التطريز:</h5><p> غرزة وراء غرزة، القماش الأبيض يولي حكاية فيها وردة وهلال ونجمة.  
الإبرة ما تخيطش وحدها، تخيط بالنية، والنية تزيّن القماش وتخلّي فيه روح.
</p>
              </div>
            
            
        </div>
        <div className='artisan-story'>
            <SmartImage src={artisanSculptor} alt="النحت والزخرفة:" />
            
            <div className='theStory'><h5>🪵 النحت والزخرفة:</h5><p>الخشب الصامت يبدأ يحكي وقت تنقش عليه يد تعرف السرّ.  
كل نقشة فيها وردة، طير، أو نجمة، وكل باب منحوت يفتح على ذاكرة تونس.</p></div>
        </div>
      </div>
    </section>
    
    </>
  )
}

export default artisanStories