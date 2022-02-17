import React , {useState,useContext} from 'react';
import { CDataTable,CCard,CCardBody,CContainer,CRow,CButton,CCollapse} from '@coreui/react';
import Modal from '../components/modal/Modal';
import { MatchContext } from "../contexts/MatchContext";


const MatchPage = () => {
    const {fields, matches, modal, isLoading, details, toggle, toggleDetails} = useContext(MatchContext);
    return (
    <CContainer>
        {/* add new user*/}
    <CRow style={{marginBottom: '40px'}}>
        <CCard>
            <CCardBody>
                <div className="d-flex justify-content-between">
                    <div>Matchs</div>
                        <CButton onClick={toggle} color='primary'>add new match</CButton>
                </div>
            </CCardBody>
        </CCard>
    </CRow>
     <Modal 
     title={'add new user'} 
     description={'information user'}
     buttonTitle={'save'}
     modal={modal}
     toggle={toggle}
     ></Modal>
    {/* disply Users */}
    <CRow>
        <CCard>
            <CCardBody>
                <CDataTable
                 fields={fields}
                 items={matches}
                 itemsPerPage={5} 
                 columnFilter
                 pagination 
                 columnFilter
                 tableFilter
                 sorter
                 hover
                 footer
                 scopedSlots={{
                    organizer: (item) => {
                        return <td className="py-2">{item.organizer.firstName} {item.organizer.lastName}</td>;
                    },
                    organizer_email: (item) => {
                        return <td className="py-2">{item.organizer.email}</td>;
                    },
                    level: (item) => {
                        return <td className="py-2">{item.level.name}</td>
                    },
                    show_details: (item,index) => {
                        return (
                            <td className="py-2">
                              <CButton
                                color="primary"
                                variant="outline"
                                shape="square"
                                size="sm"
                                onClick={()=>{toggleDetails(index)}}
                              >
                                {details.includes(index) ? 'Hide' : 'players'}
                              </CButton>
                            </td>
                            )
                    },
                    details: (item,index) => {
                        return (
                            <CCollapse show={details.includes(index)}>
                            <CCardBody>
                            <CDataTable
                             items={item.players}
                             />
                            </CCardBody>
                          </CCollapse>
                        )
                    }
                 }}
                 />
            </CCardBody>
        </CCard>
    </CRow>
    </CContainer>

    );
};
export default MatchPage;