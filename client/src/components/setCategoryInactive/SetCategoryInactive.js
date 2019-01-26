import { ChooseCategory } from "../ChooseCategory/ChooseCategory";
import React from "react";
import {Col, Grid, PageHeader, Alert} from 'react-bootstrap';


export class SetCategoryInactive extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedCategoryId: -1,
            selectedCategoryType: -1,
        }
    }

    onChangeCategoryHeader = (name1, name2) => {
        this.setState(
            {selectedCategoryId: name1, selectedCategoryType: name2},
        );
    };

    render() {
        const {onChangeCategoryHeader} = this.props;
        return (
            <Grid className={"bottomFooter"}>
                <Col md={3}/>
                <Col md={6}>
                    <PageHeader>
                        Sett kategori til inaktiv
                    </PageHeader>
                    <ChooseCategory
                        changeCategoryHeader={this.onChangeCategoryHeader.bind(this)}
                        //  onClick={this.handleCategoryClick.bind(this)}
                        statusButton={true}

                    />
                </Col>
                <Col md={3}/>
            </Grid>
        )
    }


}