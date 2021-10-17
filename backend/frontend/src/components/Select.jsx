import React, { Fragment } from 'react';
import { getExportationList, getCleanList, getDeliveryList } from '../actions/status';

import { changeExportationStatus, changeCleanStatus, changeDeliveryStatus } from '../actions/orders';
import { connect } from 'react-redux';

const doptions = [
    { value: 0,  label: 'Ожидается', color:'silver' },
    { value: 1,  label: 'В пути',    color:'green'  },
    { value: 2,  label: 'Готово' ,   color:'green'  }
]
const coptions = [
  { value: 0,  label: 'Ожидается', color:'silver'  },
  { value: 1,  label: 'В чистке',  color:'green'   },
  { value: 2,  label: 'Готово',    color:'green'   }
]

class CustomSelect extends React.Component {

  
  
  changeExportation = (e) => {
    this.props.changeExportationStatus( e.target.value, this.props.id, this.props.name, this.props.routeParam) 
  }

  changeClean = (e) => {
    this.props.changeCleanStatus( e.target.value, this.props.id, this.props.name, this.props.routeParam) 
  }

  changeDelivery = (e) => {

    this.props.changeDeliveryStatus( e.target.value, this.props.id, this.props.name, this.props.routeParam) 

  }

  render() {
   
   
    const {routeParam, exportationStatus, cleanStatus, statusDelivery} = this.props;

    let select,status,eLabel = {},cLabel = {},dLabel = {};
    
      if (exportationStatus === 0) { eLabel.title = "Ожидается"; eLabel.class = "waiting"; }
      else if (exportationStatus === 1) { eLabel.title = "В пути"; eLabel.class = "procces" }
      else if (exportationStatus === 2){ eLabel.title = "Готово"; eLabel.class = "done" }

      if (cleanStatus === 0) { cLabel.title = "Ожидается";  cLabel.class = "waiting" }
      else if (cleanStatus === 1) { cLabel.title = "В чистке"; cLabel.class = "procces" }
      else if (cleanStatus === 2) { cLabel.title = "Готово"; cLabel.class = "done" }

      if (statusDelivery === 0) { dLabel.title = "Ожидается"; dLabel.class = "waiting" }
      else if (statusDelivery === 1) { dLabel.title = "В пути"; dLabel.class = "procces" }
      else if (statusDelivery === 2){ dLabel.title = "Готово"; dLabel.class = "done" }



    if (routeParam === 1) {
      status = (<span className={eLabel.class} ></span>)
      select = (<select value={exportationStatus} onChange={this.changeExportation} className="form-select" aria-label="Default select example">
                {doptions.map(option=>(
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>)
    }
    if (routeParam === 2) {
      status = (<span className={cLabel.class}> </span>)
      select = (<select value={cleanStatus} onChange={this.changeClean}  className="form-select" aria-label="Default select example">
                {coptions.map(option=>(
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>)
    }
    if (routeParam === 3) {
      status = (<span className={dLabel.class}/>)
      select = (<select value={statusDelivery} onChange={this.changeDelivery}  className="form-select" aria-label="Default select example">
                {doptions.map(option=>(
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>)
    }
    return (
      <Fragment>
        
        <div className="order__select">
        {status}
        {select}</div>
        
      </Fragment>
       
    );
  }
}

const mapStateToProps = state =>({
  routeParam: state.status.route
})

export default connect(mapStateToProps, {getExportationList, getCleanList, getDeliveryList, changeExportationStatus, changeCleanStatus, changeDeliveryStatus})(CustomSelect);