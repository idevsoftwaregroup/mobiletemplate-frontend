import "swiper/css";
import { useState } from "react";
import ArticlePage from "./ArticlePage";
import "../assets/css/style.css";

export default function Articles() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [showArticle, setShowArticle] = useState(false);

  const slides = [
    {
      title: "مدیریت اضطراب و کاهش استرس",
      text: "شناخت عوامل اضطراب، روش‌های کنترل استرس و تکنیک‌هایی برای رسیدن به آرامش ذهنی.",
      icon: "psychology",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88",
      width: "150px",
      backgroundColor: "green1",
      content: `

اضطراب یکی از تجربه‌های رایج انسانی است که می‌تواند بر احساسات، رفتارها و کیفیت زندگی تاثیر بگذارد.

گاهی اضطراب به دلیل فشارهای روزمره، نگرانی درباره آینده یا تجربه‌های دشوار گذشته ایجاد می‌شود.

شناخت افکار و احساسات اولین قدم برای مدیریت اضطراب است.

برخی روش‌های موثر:

- تمرین تنفس عمیق
- شناخت افکار منفی
- تنظیم سبک زندگی
- خواب کافی
- فعالیت بدنی
- صحبت با متخصص روان‌شناس

درمان اضطراب به معنای حذف کامل احساس نگرانی نیست؛ بلکه یادگیری مهارت‌هایی برای مدیریت بهتر آن است.

در هستان، با رویکرد علمی و همدلانه، همراه شما برای شناخت بهتر خود و رسیدن به آرامش بیشتر هستیم.

`,
    },

    {
      title: "افزایش اعتماد به نفس",
      text: "چگونه شناخت خود، باورهای ذهنی و تجربه‌های زندگی بر اعتماد به نفس تاثیر می‌گذارند.",
      icon: "self_improvement",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      width: "150px",
      backgroundColor: "blue1",
      content: `

اعتماد به نفس یکی از عوامل مهم در تصمیم‌گیری، روابط اجتماعی و رشد فردی است.

بسیاری از مشکلات اعتماد به نفس از باورهای محدودکننده‌ای شکل می‌گیرند که در طول زمان ایجاد شده‌اند.

برای تقویت اعتماد به نفس می‌توان:

- نقاط قوت خود را شناخت
- اهداف کوچک و قابل دستیابی تعیین کرد
- از مقایسه مداوم با دیگران فاصله گرفت
- گفت‌وگوی درونی مثبت ایجاد کرد

اعتماد به نفس یک ویژگی ثابت نیست؛ بلکه مهارتی است که می‌توان آن را تقویت کرد.

`,
    },

    {
      title: "روابط سالم و مهارت‌های ارتباطی",
      text: "شناخت الگوهای ارتباطی و ایجاد روابط عاطفی و اجتماعی سالم‌تر.",
      icon: "favorite",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
      width: "150px",
      backgroundColor: "pink1",
      content: `

روابط سالم بر پایه احترام، اعتماد، درک متقابل و ارتباط موثر شکل می‌گیرند.

بسیاری از تعارض‌ها به دلیل نبود مهارت‌های ارتباطی مناسب ایجاد می‌شوند.

مهارت‌هایی مانند:

- گوش دادن فعال
- بیان احساسات به شکل درست
- تعیین مرزهای سالم
- مدیریت اختلافات

می‌توانند کیفیت روابط فردی و عاطفی را بهبود دهند.

روان‌شناسی به ما کمک می‌کند الگوهای رفتاری خود را بهتر بشناسیم و روابط آگاهانه‌تری ایجاد کنیم.

`,
    },

    {
      title: "شناخت خود و رشد فردی",
      text: "مسیر خودشناسی، کشف توانایی‌ها و ساختن زندگی هدفمندتر.",
      icon: "person",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      width: "150px",
      backgroundColor: "orange1",
      content: `

خودشناسی پایه اصلی رشد فردی است.

وقتی شناخت بیشتری از احساسات، ارزش‌ها، نقاط قوت و ضعف خود داشته باشیم، تصمیم‌های آگاهانه‌تری می‌گیریم.

خودشناسی کمک می‌کند:

- اهداف واقعی خود را پیدا کنیم
- الگوهای رفتاری تکرارشونده را بشناسیم
- احساسات خود را بهتر مدیریت کنیم
- ارتباط بهتری با دیگران داشته باشیم

رشد فردی یک مسیر تدریجی است که با آگاهی و تمرین شکل می‌گیرد.

`,
    },

    {
      title: "افسردگی؛ شناخت علائم و راه‌های کمک",
      text: "آشنایی با نشانه‌های افسردگی و اهمیت دریافت حمایت تخصصی.",
      icon: "health_and_safety",
      image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a",
      width: "150px",
      backgroundColor: "purple1",
      content: `

افسردگی فقط احساس ناراحتی موقت نیست؛ بلکه می‌تواند بر احساسات، انرژی، خواب، تمرکز و روابط فرد تاثیر بگذارد.

برخی نشانه‌های رایج:

- کاهش علاقه به فعالیت‌های روزمره
- احساس خستگی مداوم
- تغییر در خواب یا اشتها
- احساس بی‌ارزشی یا ناامیدی

کمک گرفتن از روان‌شناس می‌تواند در شناخت علت‌ها و پیدا کردن مسیر مناسب درمان موثر باشد.

در هستان، هدف ما ایجاد فضایی امن برای گفتگو، شناخت و بهبود سلامت روان است.

`,
    },
  ];

  const style = {
    rightAlign: "rtl",
    leftAlign: "ltr",
    article: "transparent padding border round",
  };

  return (
    <div>
      {slides.map((item, index) => (
        <article
          className={`${style.article} backgroundColor`}
          dir={style.rightAlign}
        >
          <div className="grid no-space ">
            <div className="s3">
              <img className="responsive small bottom round" src={item.image} />
              <div
                key={index}
                className="absolute top left right padding white-text"
              >
                {/*<h5>{item.title}</h5>*/}
                {/*<p>{ item.text }</p>*/}
              </div>
            </div>
            <div className="s9 no-space">
              <div className="padding">
                <h5 className="small bold">{item.title}</h5>
                <p>{item.text}</p>
                <nav>
                  <button
                    className="border round"
                    onClick={() => {
                      setSelectedArticle(item);
                      setShowArticle(true);
                    }}
                  >
                    مشاهده مقاله
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </article>
      ))}
      <ArticlePage
        article={selectedArticle}
        open={showArticle}
        close={() => setShowArticle(false)}
      />
    </div>
  );
}
