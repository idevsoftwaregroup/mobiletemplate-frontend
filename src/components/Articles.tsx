import "swiper/css";
import { useState } from "react";
import ArticlePage from "./ArticlePage";
import "../assets/css/style.css";

export default function Articles() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [showArticle, setShowArticle] = useState(false);

  const slides = [
    {
      title: "آینده معماری نرم افزار",
      text: "بررسی معماری های مدرن، Microservices، Clean Architecture و روش های ساخت نرم افزارهای مقیاس پذیر.",
      icon: "architecture",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31",
      width: "150px",
      backgroundColor: "orange1",
      content: `
  معماری نرم افزار یکی از مهمترین بخش های توسعه سیستم های نرم افزاری است.
  یک معماری مناسب باعث می شود سیستم در برابر تغییرات آینده، افزایش کاربران و توسعه قابلیت های جدید مقاوم باشد.

  در گذشته بسیاری از نرم افزارها به صورت Monolithic طراحی می شدند. در این مدل تمام بخش های سیستم مانند رابط کاربری، منطق کسب و کار و دسترسی به داده ها در یک برنامه واحد قرار داشتند.

  با رشد سیستم ها، معماری های مدرن مانند Microservices، Clean Architecture و Domain Driven Design به وجود آمدند.

  در معماری Microservices، سیستم به سرویس های کوچک و مستقل تقسیم می شود. هر سرویس مسئولیت مشخصی دارد و می تواند مستقل توسعه، تست و Deploy شود.

  مزایای معماری Microservices:

  - مقیاس پذیری بهتر
  - توسعه مستقل تیم ها
  - کاهش وابستگی بین بخش ها
  - افزایش قابلیت نگهداری

  Clean Architecture نیز تلاش می کند وابستگی های نرم افزار را مدیریت کند. در این معماری قوانین کسب و کار در مرکز قرار گرفته و جزئیات مانند Database و Framework به لایه های بیرونی منتقل می شوند.

  یک معماری خوب فقط انتخاب تکنولوژی نیست؛ بلکه نتیجه تحلیل درست نیازمندی ها، شناخت Domain و رعایت اصول مهندسی نرم افزار است.

  در i-dev Software Group ما معماری نرم افزار را به عنوان پایه اصلی ساخت سیستم های قابل اعتماد، امن و مقیاس پذیر در نظر می گیریم.
  `,
    },

    {
      title: "مهندسی نرم افزار مدرن",
      text: "از Clean Code تا Design Pattern ها؛ اصولی که کیفیت و نگهداری نرم افزار را متحول می کنند.",
      icon: "code",
      image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      width: "150px",
      backgroundColor: "lime1",
      content: `
  مهندسی نرم افزار فقط نوشتن کد نیست؛ بلکه فرآیندی برای طراحی، توسعه، تست و نگهداری نرم افزارهای با کیفیت است.

  یک مهندس نرم افزار حرفه ای باید بتواند سیستم هایی ایجاد کند که علاوه بر عملکرد مناسب، خوانا، قابل توسعه و قابل نگهداری باشند.

  مفهوم Clean Code توسط رابرت مارتین معرفی شد و بر اهمیت خوانایی کد تاکید دارد.

  ویژگی های Clean Code:

  - نام گذاری صحیح متغیرها و توابع
  - توابع کوچک و مسئولیت مشخص
  - حذف کدهای تکراری
  - ساختار منطقی کلاس ها
  - تست پذیری بالا

  اصول SOLID نیز پایه طراحی نرم افزارهای شی گرا هستند:

  S:
  Single Responsibility Principle

  هر کلاس فقط باید یک مسئولیت داشته باشد.

  O:
  Open Closed Principle

  کد باید برای توسعه باز و برای تغییر بسته باشد.

  L:
  Liskov Substitution Principle

  کلاس های فرزند باید قابلیت جایگزینی کلاس والد را داشته باشند.

  I:
  Interface Segregation Principle

  اینترفیس های کوچک و مشخص بهتر از اینترفیس های بزرگ هستند.

  D:
  Dependency Inversion Principle

  وابستگی ها باید به abstraction وابسته باشند.

  استفاده از Design Pattern ها باعث می شود مشکلات رایج طراحی با راه حل های استاندارد حل شوند.

  مهندسی نرم افزار مدرن ترکیبی از دانش فنی، تجربه معماری و تفکر حل مسئله است.
  `,
    },

    {
      title: "امنیت در چرخه توسعه",
      text: "نگاهی به DevSecOps، امنیت کد، تست های امنیتی و ساخت نرم افزارهای امن.",
      icon: "security",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3",
      width: "150px",
      backgroundColor: "blue1",
      content: `
  امنیت نرم افزار دیگر یک مرحله جداگانه در پایان توسعه نیست.

  در رویکردهای مدرن مانند DevSecOps، امنیت از اولین مراحل طراحی و توسعه وارد چرخه تولید نرم افزار می شود.

  چرخه امن توسعه نرم افزار شامل:

  - Secure Design
  - Secure Coding
  - Code Review
  - SAST
  - DAST
  - Dependency Scanning
  - Container Security

  ابزارهای SAST مانند Fortify و CodeQL می توانند مشکلات امنیتی موجود در کد را قبل از انتشار شناسایی کنند.

  همچنین SCA برای بررسی کتابخانه های Third Party و آسیب پذیری های Dependency ها استفاده می شود.

  تهدیدهای رایج نرم افزار:

  - SQL Injection
  - Cross Site Scripting
  - Broken Authentication
  - Insecure API
  - Sensitive Data Exposure

  امنیت واقعی زمانی ایجاد می شود که تیم های توسعه، عملیات و امنیت در کنار هم کار کنند.

  DevSecOps فرهنگ همکاری بین Development، Security و Operations است.
  `,
    },

    {
      title: "دنیای هوش مصنوعی",
      text: "چگونه AI و تکنولوژی های جدید مسیر توسعه نرم افزار را تغییر می دهند.",
      icon: "psychology",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      width: "150px",
      backgroundColor: "deep-purple1",
      content: `
  هوش مصنوعی یکی از بزرگترین تغییرات دنیای فناوری در سال های اخیر است.

  AI باعث شده بسیاری از فرآیندهای سنتی توسعه نرم افزار سریع تر، هوشمندتر و دقیق تر شوند.

  کاربردهای AI در مهندسی نرم افزار:

  - تولید کد
  - تحلیل خطاها
  - تست خودکار
  - بررسی امنیت
  - تحلیل داده
  - پردازش زبان طبیعی

  مدل های زبانی بزرگ مانند LLM ها امکان ایجاد دستیارهای هوشمند برنامه نویسی را فراهم کرده اند.

  اما استفاده صحیح از AI نیازمند دانش مهندسی است.

  هوش مصنوعی جایگزین مهندس نرم افزار نیست؛ بلکه یک ابزار قدرتمند برای افزایش بهره وری مهندسان است.

  آینده توسعه نرم افزار ترکیبی از تجربه انسانی و قدرت هوش مصنوعی خواهد بود.
  `,
    },

    {
      title: "Cloud Native و DevOps",
      text: "ساخت، استقرار و مدیریت سیستم های مدرن با Kubernetes، CI/CD و Cloud.",
      icon: "cloud",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      width: "150px",
      backgroundColor: "brown2",
      content: `
  Cloud Native یک رویکرد مدرن برای ساخت و اجرای نرم افزار در محیط های ابری است.

  در این معماری، نرم افزارها برای مقیاس پذیری، انعطاف پذیری و مدیریت آسان طراحی می شوند.

  مفاهیم اصلی Cloud Native:

  - Containers
  - Kubernetes
  - Microservices
  - Infrastructure as Code
  - CI/CD

  Docker امکان بسته بندی برنامه به همراه تمام Dependency ها را فراهم می کند.

  Kubernetes نیز مدیریت Container ها، Scaling و Deployment را ساده می کند.

  DevOps فرهنگ همکاری بین تیم توسعه و عملیات است که باعث افزایش سرعت انتشار نرم افزار می شود.

  Pipeline های CI/CD امکان Build، Test و Deploy خودکار را فراهم می کنند.

  امروزه بسیاری از سازمان های بزرگ برای ساخت سیستم های Enterprise از Cloud Native Architecture استفاده می کنند.
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
        <article className={`${style.article} backgroundColor`} dir={style.rightAlign}>
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
