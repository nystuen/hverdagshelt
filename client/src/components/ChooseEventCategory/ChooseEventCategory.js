import ReactDOM from "react-dom";
import * as React from "react";
import { Component } from "react-simplified";
import {
    ListGroup, ListGroupItem
} from "react-bootstrap";
import { EventCategoryService } from "../../services";
import { EventCategory } from "../../classTypes";
import cloneDeep from "lodash/cloneDeep";

let eventCategoryService = new EventCategoryService();

export class ChooseEventCategory extends Component<{
  registerCategory?: boolean
}> {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      selectedCategory: { name: "ingen" },
      selectedCategoryId: -1,
      newCategoryHeader: "Den nye overkategorien"
    };

    this.handleClick = this.handleClick.bind(this);
  }

  //used in adminAddCategory to get the chosen category header
  //Finn ut hva som skal tas imot fra den andre
  onChangeCategoryHeader = () => {
    this.props.changeCategoryHeader(
      this.state.selectedCategoryId,
      this.state.selectedCategoryType
    );
  };

  getSelectedCategoryId() {
    return this.state.selectedCategoryId;
  }

  getSelectedCategoryType() {
    return this.state.selectedCategoryType;
  }

  getSelectedCategoryName() {
    return this.state.selectedCategory;
  }

  componentDidMount() {
    let kat1 = [];

    eventCategoryService.getEventCategory().then(resources => {
      resources.map(r => {
        let elem: EventCategory = {
          name: r.name,
          id: r.eventCategoryId,
          active: r.active,
          open: false
        };
        kat1 = kat1.concat(elem);
      });

      this.setState({
        category: kat1
      });
    });
  }

  handleClick(cat1: EventCategory) {
    let arr = cloneDeep(this.state.category);

    let objectIndex = this.state.category.indexOf(cat1);

    arr.map(e => {
      e.open = false;
    });

    arr[objectIndex].open = !this.state.category[objectIndex].open;

    this.state.category[objectIndex].open = !this.state.category[objectIndex]
      .open;

    this.setState(
      {
        category: arr,
        selectedCategory: cat1,
        selectedCategoryId: cat1.id
      },
      this.onChangeCategoryHeader.bind(this)
    );
  }

  render() {
    return (
      <div>
        <h2>Velg kategori for eventet</h2>
        <ListGroup>
          {this.state.category.map(cat1 => {
            return (
              <div key={cat1.id}>
                <ListGroupItem onClick={() => this.handleClick(cat1)}>
                  {cat1.name}
                </ListGroupItem>
              </div>
            );
          })}
        </ListGroup>
      </div>
    );
  }
}