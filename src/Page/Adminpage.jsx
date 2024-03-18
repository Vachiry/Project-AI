import { useState, useEffect } from 'react';
import { Card, Modal, Input, Button } from 'antd';
import './Editpage.css';
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";


const Adminpage = () => {

    const [admins, setAdmins] = useState([]);
    const [filteredAdmin, setfilteredAdmin] = useState([]);
    const [search, setSearch] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [editedAdmin, setEditedAdmin] = useState({ 
        admin_ID: '', 
        admin_name: ' ', 
        admin_surname: '' , 
        admin_username: ' ',
        admin_email: ' '
    });

        useEffect(() => {
            const fetchAdmin = async () => {
                try {
                    const url = `http://127.0.0.1:5000/admin`;
                    const response = await fetch(url);
    
                    if (response.ok) {
                        const responseData = await response.json();
                        setAdmins(responseData.admin);
                    } else {
                        const errorData = await response.json();
                        console.error('API call failed:', errorData.error);
                        window.alert(`Failed to make API call: ${errorData.error}`);
                    }
                } catch (error) {
                    window.alert('Error during API call. Please try again.');
                    console.error('Error during API call:', error);
                }
            };
    
            fetchAdmin();
        }, []);

        const handleEdit = (row) => {
            setEditedAdmin({
                admin_ID : row.admin_ID,
                admin_name : row.admin_name,
                admin_surname: row.admin_surname,
                admin_email: row.admin_email,
                admin_username: row.admin_username,
                //admin_password: row.admin_password,
               
             });     
             setIsEditing(true);
        };

        const columns = [
            {
                name: <h1 className="column-name">ID</h1>,
                selector: (row) => row.admin_ID,
                width: '300px',
                sortable: true
                
            },
            {
                name: <h1 className="column-name">Name</h1>,
                selector: (row) => row.admin_name,
                width: '300px',
                sortable: true
            },
            {
                name: <h1 className="column-name">Surname</h1>,
                selector: (row) => row.admin_surname,
                width: '300px',
                wrap: true
            },
            {
                name: <h1 className="column-name">Email</h1>,
                selector: (row) => row.admin_email,
                width: '300px',
                sortable: true
            },
            {
                name: <h1 className="column-name">Username</h1>,
                selector: (row) => row.admin_username,
                width: '300px',
                sortable: true
            },
            
            {
                name: <h1 className="column-name">Action</h1>,
                cell: (row) => (
                    <>
                        <button className='btn-primary-edit' onClick={() => handleEdit(row)}>Edit</button>
                        <button className='btn-primary-delete' onClick={() => handleDelete(row.admin_ID)}>Delete</button>
                    </>
                ),
                width: '200px'
              
              
            }
        ];
        const handleSave = async (event) => {
            event.preventDefault();
        
            if (editedAdmin && editedAdmin.admin_ID && editedAdmin.admin_name && editedAdmin.admin_surname && editedAdmin.admin_email && editedAdmin.admin_username) {
                try {
                    const response = await fetch(`http://127.0.0.1:5000/admin`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(editedAdmin),
                    });
        
                    if (response.ok) {
                        const updatedAdmin = await response.json();
                        const updatedAdmins = admins.map(admin => (admin.admin_ID === updatedAdmin.admin_ID ? updatedAdmin : admin));
        
                        setAdmins(updatedAdmins);
                        setfilteredAdmin(updatedAdmins);
                        setIsEditing(false);
                        window.location.reload(); // Consider refreshing only if necessary
                    } else {
                        const errorData = await response.json();
                        console.error('Failed to save edited admin:', errorData.error);
                        window.alert(`Failed to save edited admin: ${errorData.error}`);
                    }
                } catch (error) {
                    console.error('Error saving edited admin:', error);
                    window.alert('Error saving edited admin. Please try again.');
                }
            } else {
                window.alert('Please provide all required fields.');
            }
        }
        const handleDelete = async (adminID) => {
            try {
                const response = await fetch(`http://127.0.0.1:5000/admin/${adminID}`, {
                    method: 'DELETE',
                });
    
                if (response.ok) {
                    setAdmins(admins.filter(admin => admin.admin_ID !== adminID));
                    setfilteredAdmin(filteredAdmin.filter(admin => admin.admin_ID !== adminID));
                    window.alert(`Admin with user ID ${adminID} deleted successfully.`);
                    window.location.reload();
                } else {
                    const errorData = await response.json();
                    console.error('Failed to delete admin:', errorData.error);
                    window.alert(`Failed to delete admin: ${errorData.error}`);
                }
            } catch (error) {
                console.error('Error deleting answer:', error);
                window.alert('Error deleting answer. Please try again.');
            }
        };
        useEffect(() => {
            if (admins && admins.length > 0) {
                const result = admins.filter((admin) => {
                    // Trim the search term
                    const searchTerm = search.trim().toLowerCase();
            
                    // Check if any of the fields contain the search term
                    return (
                        (typeof admin.admin_ID === 'string' && admin.admin_ID.toLowerCase().includes(searchTerm)) ||
                        (typeof admin.admin_name === 'string' && admin.admin_name.toLowerCase().includes(searchTerm)) ||
                        (typeof admin.admin_surname === 'string' && admin.admin_surname.toLowerCase().includes(searchTerm)) ||
                        (typeof admin.admin_username === 'string' && admin.admin_username.toLowerCase().includes(searchTerm)) ||
                        (typeof admin.admin_email === 'string' && admin.admin_email.toLowerCase().includes(searchTerm))
                    );
                });
            
                setfilteredAdmin(result);
            }
        }, [search, admins]);
        
        const handleExportCSV = () => {
            if (filteredAdmin.length > 0) {
                // Map data to match CSV structure
                const csvData = filteredAdmin.map(admin => ({
                    ID: admin.admin_ID,
                    Name: admin.admin_name,
                    Surname: admin.admin_surname,
                    Email: admin.admin_email,
                    Username: admin.admin_username,
                }));
        
                // Generate CSV file
                const csvFileName = "admin_data.csv";
                return (
                    <CSVLink data={csvData} filename={csvFileName}>
                        <Button type="primary">Export CSV</Button>
                    </CSVLink>
                );
            }
        };

    return (

        <>
            <div className="Fonthead">
                <h1>Admin Table</h1>
                <div className="subtext">
                    Home / Admin
                </div>
            
            </div>

            <Card style={{padding: '30px' }} className='card'>
                {handleExportCSV()}
                <DataTable columns={columns} data={filteredAdmin} 
                pagination 
                fixedHeader
                fixedHeaderScrollHeight="450px"
                selectableRows
                selectableRowsHighlight
                highlightOnHover
               
                paginationRowsPerPageOptions={[5, 10, 15, 20]} 
                subHeader
                subHeaderComponent={
                   <input type="text"          
                   className="search-box"
                   placeholder= ' Search here... '
                   value={search}
                   onChange={(e) => setSearch(e.target.value)}
             
                   />}
            
                />
                 <Modal
                 title="Edit Answer"
                 visible={isEditing}
                 okText="Save"
                 okButtonProps={{ style: { background: '#1890ff', borderColor: '#1890ff' } }} 
                 cancelButtonProps={{ style: { background: '#f9f9f9', borderColor: '#1890ff' } }} 
                 onCancel={() => {
                    setIsEditing(false);
                 }}
                 onOk={handleSave}
                 className="custom-modal"
                 >
                    <Input 
                       value={editedAdmin.admin_ID} 
                        onChange={(e) => {
                       setEditedAdmin(prev => ({
                       ...prev, 
                      admin_ID: e.target.value
                       }));
                       }}
                       placeholder= ' ID '
                       style={{ width: '100%', marginBottom: '7px' ,  padding: '10px' }}
                       />
                    <Input 
                       value={editedAdmin.admin_name} 
                        onChange={(e) => {
                       setEditedAdmin(prev => ({
                       ...prev, 
                      admin_name: e.target.value
                       }));
                       }}
                       placeholder= ' name '
                        style={{
                            width: '100%',
                            marginBottom: '7px',
                            padding: '10px', 
                          
                        }}
                    />
                     <Input 
                       value={editedAdmin.admin_surname} 
                        onChange={(e) => {
                       setEditedAdmin(prev => ({
                       ...prev, 
                      admin_surname: e.target.value
                       }));
                       }}
                       placeholder= ' surname '
                        style={{
                            width: '100%',
                            marginBottom: '7px',
                            padding: '10px', 
                          
                          
                        }}
                    />
                     <Input 
                       value={editedAdmin.admin_email} 
                        onChange={(e) => {
                       setEditedAdmin(prev => ({
                       ...prev, 
                      admin_email: e.target.value
                       }));
                       }}
                       placeholder= ' email '
                        style={{
                            width: '100%',
                            marginBottom: '7px',
                            padding: '10px', 
                          
                        }}
                    />
                     <Input 
                       value={editedAdmin.admin_username} 
                        onChange={(e) => {
                       setEditedAdmin(prev => ({
                       ...prev, 
                      admin_username: e.target.value
                       }));
                       }}
                        placeholder= ' username '
                        style={{
                            width: '100%',
                            marginBottom: '7px',
                            padding: '10px', 
                          
                        }}
                    />
                     </Modal> 
       
         
                </Card>
           
           </>
       );
   }
          
        
        
        

export default Adminpage;