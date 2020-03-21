import React, { Component } from "react";
import OptionButtons from "./components/OptionButtons";
import DataTable from "./components/DataTable";
import PageBar from "./components/PageBar";
import store from "./components/store/Store";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: null,
      next: null,
      items: [],
      initialEndpoint: "/api/products/1"
    };
  }

  async componentDidMount() {
    console.log(this.state.initialEndpoint);
    const page = await store.getPage(this.state.initialEndpoint);

    this.setState({
      index: page.index,
      next: page.next,
      items: page.items
    });
  }

  onRadioButtonSelected = async path => {
    const page = await store.handleRadioButton(path);

    this.setState({
      index: page.index,
      next: page.next,
      items: page.items,
      initialEndpoint: path
    });
  };

  onPreviousPage = () => {
    const page = store.handlePreviousPage();

    this.setState({
      index: page.index,
      next: page.next,
      items: page.items
    });
  };

  onNextPage = async () => {
    const page = await store.handleNextPage();

    this.setState({
      index: page.index,
      next: page.next,
      items: page.items
    });
  };

  render() {
    const { index, next, items, initialEndpoint } = this.state;

    return (
      <div className="app">
        <header>
          <p>Kogan.com Coding Challenge</p>
        </header>

        <React.Fragment>
          <OptionButtons
            onRadioButtonChange={this.onRadioButtonSelected}
            selected={initialEndpoint}
          />
          {items ? (
            <DataTable items={items} />
          ) : (
            <h2 style={{ margin: "50px 0" }}>Error fetching this page</h2>
          )}
          <PageBar
            index={index}
            next={next}
            onPrevious={this.onPreviousPage}
            onNext={this.onNextPage}
          />
        </React.Fragment>
      </div>
    );
  }
}

export default App;
