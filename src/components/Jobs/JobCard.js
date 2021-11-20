import React, { Component } from 'react'
import Modal from 'react-modal'
import { Redirect, Link } from 'react-router-dom';

export default class JobCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            customStyles: {
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    'border-radius': '15px',
                    border: 'solid',
                },
            },
        }
    }
    handleModal = () => {
        this.setState({ showModal: true });
    }
    hideModal = () => {
        this.setState({ showModal: false });
    }
    render() {
        return (
            <>
                <div className="col-md-3">
                    <div className="card" >
                        <div className="card-body">
                            <h5 className="card-title">{this.props.jobData.title}</h5>
                            <p className="card-text">{this.props.jobData.description}</p>
                            <a className="card-link first-btn"><i class="fa fa-map-marker" aria-hidden="true"></i>{this.props.jobData.location}</a>
                            <Link onClick={this.handleModal} class="btn btn-card">View Applications</Link>
                        </div>
                    </div>
                </div>
                {/* No API is present to get the data for the Applicants for the particular job so creating an dummy card. */}
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.hideModal}
                    style={this.state.customStyles}
                    contentLabel="Example Modal">
                    <h5>Applicants for this job</h5>
                    <i class="fa fa-times" onClick={this.hideModal}></i>
                    <hr />
                    <label>Total 0 Applications</label>
                    <div className="col-md-6">
                        <div className="card" >
                            <div className="card-body">
                                <h5 className="card-title">Name</h5>
                                <p className="card-text">Skills</p>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}
