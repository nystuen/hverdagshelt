//@flow

import React from 'react';
import Grid from "react-bootstrap/es/Grid";
import {PageHeader} from "../../../components/PageHeader/PageHeader";
import Table from "react-bootstrap/es/Table";

export class adminEvents extends React.Component{
    render(){
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
                </Table>
            </Grid>
        )
    }//end method
}//end class