import React, { Component } from 'react'
import Modal from 'react-modal'
import { Link } from 'react-router-dom';
import axios from 'axios';
import CandidateCard from './CandidateCard';

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
                    width: '600px',
                    marginRight: '-50%',
                    transform: 'translate(-50%, -50%)',
                    'border-radius': '15px',
                    border: 'solid 1px',
                },
            },
            candidates: [],
        }
    }
    handleModal = () => {
        this.setState({ showModal: true });
        const headers = {
            'Authorization': JSON.parse(localStorage.getItem('tokens'))
        }
        console.log(this.props.jobData.id);
        axios.get("https://jobs-api.squareboat.info/api/v1/recruiters/jobs/"+this.props.jobData.id+"/candidates", {headers: headers}).then(
            res => {
                console.log(res);
                if(res.data.message==="No candidates have applied for the job posting"){
                   
                }else{
                this.setState({ candidates: (res.data.data.length > 0 ? ([...res.data.data]) : '' )});
                }
            })
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
                            <p className="card-text job-desc">{this.props.jobData.description}</p>
                            <div className="hash">
                            <a className="card-link first-btn"><i class="fa fa-map-marker" aria-hidden="true"></i>{this.props.jobData.location}</a>
                            <Link onClick={this.handleModal} class="btn btn-card">View Applications</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={this.hideModal}
                    style={this.state.customStyles}
                    contentLabel="Candidate Modal">
                    <div className="hash">
                    <h6>Applicants for this job</h6>
                    <i class="fa fa-times" onClick={this.hideModal}></i>
                    </div>
                    <hr />
                    <label className="labels">Total {this.state.candidates.length} Applications</label>
                    <div className="row">{
                    this.state.candidates.length > 0 ?
                            this.state.candidates.map((candidate) => {
                                return (<CandidateCard candidateData={candidate} />)
                            }) : (<div className="no-application align-middle">No applications available!</div>)
                            }
                    </div>
                </Modal>
            </>
        )
    }
}
