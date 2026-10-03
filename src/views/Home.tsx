import Articles from "../components/Articles";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import OpeningBanner from "../components/OpeningBanner";
import FeaturedProducts from "../components/FeaturedProducts";

export default function Home() {
  return (
    <section>
      {/* Search */}
      <div className="field label border border-style round large grey3">
        <input
          type="text"
          style={{
            border: "1px solid #dedede",
          }}
        />

        <label>جستجو کن</label>

        <i className="large">search</i>
      </div>

      <div className="medium-space" />

      {/* Opening Banner */}
      <OpeningBanner />

      <div className="large-space" />

      {/* Banner */}
      <Banner />

      <div className="large-space" />

      {/* Categories */}
      <div className="right margin bottom3 bold large" dir="rtl">
        <h6 className="right bold">دسته بندی</h6>
      </div>

      <Categories />

      <div className="large-space" />

      {/* Articles */}
      <div className="right margin bottom3 bold large" dir="rtl">
        <h6 className="right bold">آخرین مقاله ها</h6>
      </div>

      <Articles />

      <div className="large-space" />
    </section>
  );
}
