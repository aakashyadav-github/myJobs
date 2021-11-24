import React, { Component } from 'react'

export default class CandidateCard extends Component {
    render() {
        return (
            <>
                 <div className="col-md-6">
                        <div className="card card-candidate" >
                            <div className="card-body">
                                <div className="row">
                                <div className="col-sm-3">
                                    <img  class="rounded-circle"/>   
                                </div>
                                <div className="col-sm-9">
                                    <label>{this.props.candidateData.name}</label><br/>
                                    <label className="skills-content">{this.props.candidateData.email}</label>
                                </div>
                                </div>
                                <label class="skills-label">Skills</label>
                                <p className="skills-content">{this.props.candidateData.skills}</p>
                            </div>
                        </div>
                    </div>
            </>
        )
    }
}
