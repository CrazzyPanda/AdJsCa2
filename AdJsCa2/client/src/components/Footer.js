import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Footer extends React.Component{
  render() {
    return(
      <div style={{backgroundColor: '#343a40'}}>

          <br/>
          <p className="text-center small" style={{color:'white'}}>
            This website does not have any affiliation with Avatar: The Last Airbender or Nickelodeon.<br/>
            The information and images provided are taken from the Avatar Fandom Website: https://avatar.fandom.com/wiki/Avatar:_The_Last_Airbender
          </p>
          <br/>

      </div>
    );
  }
}

export default Footer;
