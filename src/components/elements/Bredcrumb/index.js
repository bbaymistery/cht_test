import React from 'react'
import StepsOfPages from '../StepsOfPages'

const Breadcrumb = (props) => {
    let { title, service, about } = props

    return (
        <div id="page-header">
            <h1>{title}</h1>
            <div className="title-block3"></div>
            <p>
                <a href="/">Home</a>
                {service ? <i className="fa fa-angle-right" style={{ fontSize: "11px" }}></i> : <React.Fragment></React.Fragment>}
                {service ? "Service Rates" : <React.Fragment></React.Fragment>}
                {about ? <i className="fa fa-angle-right" style={{ fontSize: "11px" }}></i> : <React.Fragment></React.Fragment>}
                {about ? "About Us" : <React.Fragment></React.Fragment>}
                <i className="fa fa-angle-right" style={{ fontSize: "11px" }}></i>
                {title}
            </p>
        </div>
    )
}

export default Breadcrumb