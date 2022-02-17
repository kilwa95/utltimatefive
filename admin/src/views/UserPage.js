import React , {useState,useContext} from 'react';
import { CDataTable,CCard,CCardBody,CContainer,CRow,CButton, CBadge} from '@coreui/react';
import Modal from '../components/modal/Modal';
import Switch from '../components/switch/Switch';
import { UserContext } from "../contexts/UserContext";


const UserPage = () => {
    const [modal, setModal] = useState(false);
    const {fields, users, isLoading, getBadge} = useContext(UserContext);

    const toggle = ()=>{
        setModal(!modal);
      }

    return (
    <CContainer>
        {/* add new user*/}
    <CRow style={{marginBottom: '40px'}}>
        <CCard>
            <CCardBody>
                <div className="d-flex justify-content-between">
                    <div style={{fontWeight: 'bold'}}>List users</div>
                        {/* <CButton onClick={toggle} color='primary'>Add new user</CButton> */}
                </div>
            </CCardBody>
        </CCard>
    </CRow>
     <Modal 
     title={'Add new user'} 
     buttonTitle={'save'}
     modal={modal}
     toggle={toggle}
     >
     </Modal>
    {/* disply Users */}
    {isLoading ? (
        <div>Loading...</div>
    ) :
    <CRow>
    <CCard>
        <CCardBody>
            <CDataTable 
             items={users}
             fields={fields}
             itemsPerPage={5}
             itemsPerPageSelect
             pagination 
             columnFilter
             tableFilter
             sorter
             hover
             footer
             scopedSlots={{
                level: (item) => {
                    return <td className="py-2">{item.level.name}</td>
                },
                enable: (item) => {
                    return <Switch item={item} />;
                },
                // status: (item) => {
                //     <td className="py-2">
                //     <CBadge color={getBadge(item.status)}>
                //       {item.status}
                //     </CBadge>
                //   </td>
                // }
             }}
             />
        </CCardBody>
    </CCard>
</CRow>
    }
    </CContainer>
    );
};
export default UserPage;