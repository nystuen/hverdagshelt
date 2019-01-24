//@flow

import React from 'react';
import {Button, Col, Grid, Table, Tooltip} from "react-bootstrap"
import {PageHeader} from "../../../components/PageHeader/PageHeader";
import {EventCategoryService} from "../../../services";
import {NavItem, Nav, FormControl} from "react-bootstrap";
import OverlayTrigger from "../adminIssues/adminIssues";

let eventCategoryService = new EventCategoryService();

const toolTipEdit = (
    <Tooltip id="tooltip">
        Rediger hendelse
    </Tooltip>
);

const toolTipDelete = (
    <Tooltip id="tooltip">
        Slett hendelse
    </Tooltip>
);

export class adminEvents extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            events: [],
            selectedEvent: {},
            allEventCategories: [],
            edit: {}
        };
        this.handleStringChange = this.handleStringChange.bind(this);
        this.deleteEvent = this.deleteEvent.bind(this);
        this.editEvent = this.editEvent.bind(this);
    }//end constructor


    render(){
        let showEvents;
        showEvents = this.state.events.map(event => {
            if(this.state.edit === event.eventId){
                this.setState({selectedEvent: event});
                return(
                    <tr key={event.eventId}>
                        <td>
                            <FormControl type={"text"}
                            value={this.state.selectedEvent.title}
                            onChange={this.handleStringChange(this.state.selectedEvent.title)}/>
                        </td>
                    </tr>
                )
            }else{
            return(
                <tr key={event.eventId}>
                    <td>
                        <Nav bsStyle="pills">
                            <NavItem href={'/#hendelse/' + event.eventId}>
                                {event.title}
                            </NavItem>
                        </Nav>
                    </td>
                    <td>
                        {event.text}
                    </td>
                    <td>
                        {event.name}
                    </td>
                    <td>
                        {event.date}
                    </td>
                    <td>
                        {event.userMail}
                    </td>
                    <td>
                                <Button bsStyle="link"
                                        onClick={() => this.editEvent(event.eventId)}
                                type={"button"}>
                                    <i className="glyphicon glyphicon-pen"></i>
                                </Button>

                                <Button bsStyle="link" style={{color: 'darkred'}}
                                        onClick={() => this.deleteEvent(event)}
                                type={"button"}>
                                    <span className="glyphicon glyphicon-trash"></span>
                                </Button>

                    </td>
                </tr>
            )
        }//end condition
        });

        return(
            <Grid>
                <PageHeader title={"Alle hendelser i " + window.sessionStorage.getItem('countyName')}/>
                <Table>
                   <thead>
                        <tr>
                            <th>
                                Tittel
                            </th>
                            <th>
                               Beskrivelse
                            </th>
                            <th>
                                Kategori
                            </th>
                            <th>
                                Dato registrert
                            </th>
                            <th>
                                Meldt inn av
                            </th>
                        </tr>
                   </thead>
                    <tbody>
                        {showEvents}
                    </tbody>
                </Table>
            </Grid>
        )
    }//end method

    componentWillMount() {
        eventCategoryService.getAllEventsInOneCounty(window.sessionStorage.getItem('countyId')).then(response => {
            this.setState({events: response});
        }).catch((error: Error) => confirm(error.message));
    }//end method

    editEvent(eventId: number){
        this.setState({edit: eventId});
    }//end method

    handleStringChange = (name: string) => (event: SyntheticEvent<HTMLInputElement>) =>{
        this.setState({[name]: event.target.value});
    };

    deleteEvent(event: Object){
        console.log(event);
        if(confirm('Vil du slette hendelsen med tittel ' + event.title + '?')){
            eventCategoryService.deleteEvent(event.eventId).then(response => {
                window.location.reload();
            }).catch((error: Error) => confirm(error.message));
        }
    }//end method
}//end class