import ReactDOM from "react-dom";
import * as React from "react";
import { Component } from "react-simplified";
import {ButtonToolbar, ToggleButtonGroup, ToggleButton, Collapse, Button} from "react-bootstrap";

export class ChooseCategory extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            kat1Open: false,
            kat2Open: false,
            Kat3Open: false,
            amountOfCategories: 4
        };
    }

    render() {
        return (
            <div>
                <ButtonToolbar>
                    <ToggleButtonGroup type="radio" name="options" vertical>

                        

                        <Button value={1} onClick={() => this.setState({
                            kat1Open: !this.state.kat1Open,
                            kat2Open: false,
                            kat3Open: false
                        })}>Kategori 1</Button>

                        <Collapse in={this.state.kat1Open}>
                            <div>
                                <Button value={11}>Kategori 1.1</Button>
                            </div>
                        </Collapse>

                        <Button value={2} onClick={() => this.setState({
                            kat1Open: false,
                            kat2Open: !this.state.kat2Open,
                            kat3Open: false
                        })}>Kategori 2</Button>

                        <Collapse in={this.state.kat2Open}>
                            <div>
                                <Button value={21}>Kategori 2.1</Button>
                            </div>
                        </Collapse>

                        <Button value={3} onClick={() => this.setState({
                            kat1Open: false,
                            kat2Open: false,
                            kat3Open: !this.state.kat1Open
                        })}>Kategori 3</Button>

                        <Collapse in={this.state.kat3Open}>
                            <div>
                                <Button value={31}>Kategori 3.1</Button>
                            </div>
                        </Collapse>

                    </ToggleButtonGroup>
                </ButtonToolbar>
            </div>
        );
    }

}