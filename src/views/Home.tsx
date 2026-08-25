import Articles from "../components/Articles";
import Banner from "../components/Banner";
import Categories from "../components/Categories";

export default function Home() {
  return (
    <section>
      <div className="field label border border-style round large grey3">
        <input type="text" style={{
            border: "1px solid #dedede"
          }}/>

        <label>جستجو کن</label>

        <i className="large">search</i>
      </div>

      <div className="large-space"></div>

      <Banner />

      <div className="large-space"></div>

      <div className="right margin bottom3 bold large" dir="RTL">
        <h6 className="right bold" >دسته بندی</h6>
      </div>

      <Categories />

      <div className="large-space"></div>

      <div className="right margin bottom3 bold large" dir="RTL">
        <h6 className="right bold" >آخرین مقاله های دنیای فناوری</h6>
      </div>

      <Articles />

      <div className="large-space"></div>

    </section>
  );
}
