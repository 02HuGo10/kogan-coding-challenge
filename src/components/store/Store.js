import { action, decorate } from "mobx";
import axios from "axios";
import _ from "lodash";

class Store {
  apiPath = "http://wp8m3he1wt.s3-website-ap-southeast-2.amazonaws.com";
  pages = [];

  getPage = async subpath => {
    const data = await this.getData(subpath);

    if (!data) {
      const page = {
        items: null,
        next: null,
        current: true
      };
      this.pages.push(page);

      return {
        index: this.pages.length,
        items: null,
        next: false
      };
    }

    data.objects.forEach(item => {
      if (item.category === "Air Conditioners")
        item["cubic_weight"] = this.calculateACW(item.size);
    });

    const page = {
      items: data.objects,
      next: data.next,
      current: true
    };
    this.pages.push(page);

    return {
      index: _.indexOf(this.pages, page),
      items: page.items,
      next: page.next ? true : false
    };
  };

  getData = async subPath => {
    try {
      const result = await axios.get(`${this.apiPath}${subPath}`);

      return result.data;
    } catch (error) {
      return null;
    }
  };

  handleRadioButton = async path => {
    this.pages = [];
    const page = await this.getPage(path);
    return page;
  };

  handlePreviousPage = () => {
    const current = _.find(this.pages, "current");
    const currentIndex = _.indexOf(this.pages, current);
    const previousPage = this.pages[currentIndex - 1];

    delete current.current;
    previousPage.current = true;
    return {
      index: currentIndex - 1,
      items: previousPage.items,
      next: previousPage.next ? true : false
    };
  };

  handleNextPage = async () => {
    const current = _.find(this.pages, "current");
    const currentIndex = _.indexOf(this.pages, current);
    delete current.current;

    if (currentIndex === this.pages.length - 1) {
      const page = await this.getPage(current.next);
      return page;
    } else {
      const nextPage = this.pages[currentIndex + 1];
      nextPage.current = true;
      return {
        index: currentIndex + 1,
        items: nextPage.items,
        next: nextPage.next ? true : false
      };
    }
  };

  calculateACW = size => {
    const widthInMeters = size.width / 100;
    const lengthInMeters = size.length / 100;
    const heightInMeters = size.height / 100;
    const cubicMeters = widthInMeters * lengthInMeters * heightInMeters;

    return `${Math.round((cubicMeters * 250 + Number.EPSILON) * 100) / 100} Kg`;
  };
}

decorate(Store, {
  getPage: action
});

const store = new Store();

export default store;
