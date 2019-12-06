import {urls} from "./urlUtils";
import {Button, Typography, ButtonGroup} from "@material-ui/core";
import React from "react";
import {Link} from "react-router-dom";
import App from "./App";

export const Welcome = () => {
    App.setCardSize();
    return (
        <React.Fragment>
            <Typography variant="headline"
                        component="h2">
                   Bem-vindo
            </Typography>
            
            <ButtonGroup color="primary" variant="contained" style={{marginTop: '5px'}}>
            {
                Object.values(urls).map((url, index) => {
                    return <Button raised 
                    key={index} 
                    component={ props => 
                        <Link to={url.path} {...props}/>
                                   }
                                   >
                        {url.name}
                    </Button>
                })
            }
            </ButtonGroup>

        </React.Fragment>
    )
};