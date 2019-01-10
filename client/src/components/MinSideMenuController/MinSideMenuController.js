// @ flow

import React from 'react';

export class MinSideMenuController extends React.Component <{type: string, menuChoice: string}> {

    render() {
        return(
            <div>
                {
                    this.props.menuChoice === 'kontooversikt' ? (
                        <div>
                            kontooversikt komponent som tar imot type
                        </div>
                    ) : (
                        <div/>
                    )
                }


                {
                    this.props.menuChoice === 'mine_saker' ? (
                        <div>
                            mine saker komponent, trenger ikke ta imot noe, kun for privat-person
                        </div>
                    ) : (
                        <div/>
                    )
                }


                {
                    this.props.menuChoice === 'arbeidsomraade' ? (
                        <div>
                            arbeidsomraade komponent, trenger ikke ta imot noe, kun for bedrifter.
                        </div>
                    ) : (
                        <div/>
                    )
                }


                {
                    this.props.menuChoice === 'kommuner' ? (
                        <div>
                            kommuner komponent som tar imot type
                        </div>
                    ) : (
                        <div/>
                    )
                }


                {
                    this.props.menuChoice === 'varselinstillinger' ? (
                        <div>
                            varselinstillinger komponent, trenger ikke ta imot noe, kun for privat-person
                        </div>
                    ) : (
                        <div/>
                    )
                }
            </div>
        );
    }
}